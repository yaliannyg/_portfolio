import type { Handler } from "@netlify/functions";

const DB_ALIASES: Record<string, string | undefined> = {
  contact: process.env.NOTION_DB_CONTACT,
  ctaLabels: process.env.NOTION_DB_CTA_LABELS,
  details: process.env.NOTION_DB_ME_DETAILS,
  profile: process.env.NOTION_DB_ME,
  projects: process.env.NOTION_DB_PROJECTS,
  sections: process.env.NOTION_DB_SECTIONS,
  skills: process.env.NOTION_DB_SKILLS,
};

function resolveAliases(path: string): string {
  return path.replace(/\/v1\/databases\/([^/]+)\//, (_, alias) => {
    const id = DB_ALIASES[alias] ?? alias;
    return `/v1/databases/${id}/`;
  });
}

const handler: Handler = async (event) => {
  const rawPath = event.path.replace("/.netlify/functions/notion", "");
  const path = resolveAliases(rawPath);
  const url = `https://api.notion.com${path}`;

  const response = await fetch(url, {
    method: event.httpMethod,
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: event.body ?? undefined,
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};

export { handler };