import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface PortfolioProfile {
  name: string;
  position: string;
  aboutMeImg: string;
  aboutMeImgAlt: string;
  summarize: string;
  cvLink: string;
}

export type Contact = {
  id: string;
  title: string;
  icon: string;
  link: string;
};

export const DB = {
  me: import.meta.env.VITE_NOTION_DB_ME,
  contact: import.meta.env.VITE_NOTION_DB_CONTACT,
};

function extractText(richText: Array<{ plain_text: string }> = []): string {
  return richText.map((t) => t.plain_text).join("");
}

async function notionFetch(path: string, body?: object) {
  const res = await fetch(`/notion${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) throw new Error(`Notion error: ${res.status}`);
  return res.json();
}

export async function getProfile(): Promise<PortfolioProfile> {
  const data = await notionFetch(`/v1/blocks/${DB.me}/children`);

  const codeBlock = data.results.find((block: any) => block.type === "code");

  if (!codeBlock) throw new Error("Profile JSON block not found");

  const raw = extractText(codeBlock.code.rich_text);

  // Fix the missing comma in the stored JSON before parsing
  const fixed = raw.replace(
    /"summarize":\s*"([^"]*?)"\s*"cv_link"/,
    '"summarize": "$1", "cv_link"',
  );

  return JSON.parse(fixed) as PortfolioProfile;
}

function mapContact(page: PageObjectResponse): Contact {
  const { title, icon, link } = page.properties;
  return {
    id: page.id,
    title: title.type === "title" ? (title.title[0]?.plain_text ?? "") : "",
    icon:
      icon.type === "rich_text" ? (icon.rich_text[0]?.plain_text ?? "") : "",
    link: link.type === "url" ? (link.url ?? "") : "",
  };
}

export async function getContacts() {
  const data = await notionFetch(`/v1/databases/${DB.contact}/query`, {});
  return data.results.map(mapContact);
}
