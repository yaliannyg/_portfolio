import type { Handler } from "@netlify/functions";

const DB_ALIASES: Record<string, string | undefined> = {
  contact: process.env.VITE_NOTION_DB_CONTACT,
  ctaLabels: process.env.VITE_NOTION_DB_CTA_LABELS,
  details: process.env.VITE_NOTION_DB_ME_DETAILS,
  meDescriptions: process.env.VITE_NOTION_DB_ME_DESCRIPTIONS,
  profile: process.env.VITE_NOTION_DB_ME,
  projects: process.env.VITE_NOTION_DB_PROJECTS,
  sections: process.env.VITE_NOTION_DB_SECTIONS,
  skills: process.env.VITE_NOTION_DB_SKILLS,
};

const CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
};

function resolveAliases(path: string): string {
  return path.replace(/\/v1\/databases\/([^/]+)\//, (_, alias) => {
    const id = DB_ALIASES[alias] ?? alias;
    return `/v1/databases/${id}/`;
  });
}

async function notionQuery(alias: keyof typeof DB_ALIASES) {
  const id = DB_ALIASES[alias];
  const r = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return r.json();
}

async function handleAll() {
  const [profile, sections, details, skills, projects, contact, ctaLabels] =
    await Promise.all([
      notionQuery("profile"),
      notionQuery("sections"),
      notionQuery("details"),
      notionQuery("skills"),
      notionQuery("projects"),
      notionQuery("contact"),
      notionQuery("ctaLabels"),
    ]);

  return {
    statusCode: 200,
    headers: CACHE_HEADERS,
    body: JSON.stringify({
      profile,
      sections,
      details,
      skills,
      projects,
      contact,
      ctaLabels,
    }),
  };
}

const handler: Handler = async (event) => {
  const rawPath = event.path.replace(
    /^\/(\.netlify\/functions\/notion|notion)/,
    "",
  );

  if (rawPath === "/all") {
    return handleAll();
  }

  const path = resolveAliases(rawPath);
  const url = `https://api.notion.com${path}`;

  const response = await fetch(url, {
    method: event.httpMethod,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: event.body ?? undefined,
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    headers: CACHE_HEADERS,
    body: JSON.stringify(data),
  };
};

export { handler };
