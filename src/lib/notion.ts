import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Section {
  title?: string;
  description?: string;
}
export interface PortfolioProfile {
  name: string;
  aboutMeImg: string;
  aboutMeImgAlt: string;
  cvLink: string;
  logo: string;
  position: string;
  summarize: string;
  section_about_me: Section;
  section_skills: Section;
}

export interface MeDetails {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export type SkillLevel = "Experienced" | "Intermediate" | "Beginner";
export type SkillCategory = "Front-End" | "Back-End" | "Others";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface SkillsGroup {
  category: SkillCategory;
  skills: Skill[];
}

export type Contact = {
  id: string;
  title: string;
  icon: string;
  link: string;
};

const DB = {
  contact: import.meta.env.VITE_NOTION_DB_CONTACT,
  details: import.meta.env.VITE_NOTION_DB_ME_DETAILS,
  me: import.meta.env.VITE_NOTION_DB_ME,
  skills: import.meta.env.VITE_NOTION_DB_SKILLS,
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

function mapMeDetail(page: PageObjectResponse): MeDetails {
  const { title, icon, description } = page.properties;

  return {
    id: page.id,
    title: title.type === "title" ? (title.title[0]?.plain_text ?? "") : "",
    icon:
      icon.type === "rich_text" ? (icon.rich_text[0]?.plain_text ?? "") : "",
    description:
      description.type === "rich_text"
        ? (description.rich_text[0]?.plain_text ?? "")
        : "",
  };
}

export async function getMeDetails(): Promise<MeDetails[]> {
  const detailsData = await notionFetch(
    `/v1/databases/${DB.details}/query`,
    {},
  );

  return (detailsData.results as PageObjectResponse[]).map((page) => {
    const { id, title, icon, description } = mapMeDetail(page);

    return {
      id,
      title,
      icon,
      description,
    };
  });
}

function mapSkill(page: PageObjectResponse): Skill {
  const { Name, Category, Level } = page.properties;

  return {
    id: page.id,
    name: Name.type === "title" ? (Name.title[0]?.plain_text ?? "") : "",
    category:
      Category.type === "select"
        ? ((Category.select?.name ?? "") as SkillCategory)
        : ("" as SkillCategory),
    level:
      Level.type === "select"
        ? ((Level.select?.name ?? "") as SkillLevel)
        : ("" as SkillLevel),
  };
}

// Flat list — use this if you just need all skills
export async function getSkills(): Promise<Skill[]> {
  const data = await notionFetch(`/v1/databases/${DB.skills}/query`, {});
  return (data.results as PageObjectResponse[]).map(mapSkill);
}

// // Grouped by category — mirrors your JSON structure
export async function getSkillsGrouped(): Promise<SkillsGroup[]> {
  const skills = await getSkills();

  const order: SkillCategory[] = ["Front-End", "Back-End", "Others"];

  const grouped = order.map((category) => ({
    category,
    skills: skills.filter((s) => s.category === category),
  }));

  return grouped;
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
