import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Section {
  title?: string;
  description?: string;
}

export interface SectionGroup {
  section_projects: Section;
  section_about_me: Section;
  section_contact: Section;
  section_skills: Section;
  [key: string]: Section;
}

export type CTAType = "Button" | "Navigation" | "Link";

export type CTALabels = Record<CTAType, Record<string, string>>;

export interface AboutMe {
  name: string;
  aboutMeImg: string;
  aboutMeImgAlt: string;
  cvLink: string;
  logo: string;
  position: string;
  summarize: string;
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

export interface ProjectItem {
  coverImage: string;
  description: string;
  id: string;
  images: string[];
  key: string;
  title: string;
  subtitle: string;
  technologies: string[];
}

export type Contact = {
  id: string;
  title: string;
  icon: string;
  link: string;
  linkLabel: string;
};

const DB = {
  contact: import.meta.env.VITE_NOTION_DB_CONTACT,
  ctaLabels: import.meta.env.VITE_NOTION_DB_CTA_LABELS,
  details: import.meta.env.VITE_NOTION_DB_ME_DETAILS,
  profile: import.meta.env.VITE_NOTION_DB_ME,
  projects: import.meta.env.VITE_NOTION_DB_PROJECTS,
  sections: import.meta.env.VITE_NOTION_DB_SECTIONS,
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

function mapLabel(acc: CTALabels, page: PageObjectResponse): CTALabels {
  const { Type, Key, Label } = page.properties;

  const type =
    Type.type === "select" && Type.select !== null
      ? (Type.select.name as CTAType)
      : null;

  const key =
    Key.type === "rich_text" ? (Key.rich_text[0]?.plain_text ?? "") : "";

  const label =
    Label.type === "title" ? (Label.title[0]?.plain_text ?? "") : "";

  if (!type || !key) return acc;

  return {
    ...acc,
    [type]: {
      ...acc[type],
      [key]: label,
    },
  };
}

export async function getCTALabels(): Promise<CTALabels> {
  const data = await notionFetch(`/v1/databases/${DB.ctaLabels}/query`, {});

  const initial: CTALabels = {
    Button: {},
    Navigation: {},
    Link: {},
  };

  return (data.results as PageObjectResponse[]).reduce(mapLabel, initial);
}

function mapAboutMe(page: PageObjectResponse): [string, string] {
  const keyProp = page.properties["Key"];
  const valueProp = page.properties["Value"];

  const key =
    keyProp.type === "title" ? (keyProp.title[0]?.plain_text ?? "") : "";

  const value =
    valueProp.type === "rich_text"
      ? (valueProp.rich_text[0]?.plain_text ?? "")
      : "";

  return [key, value];
}

export async function getAboutMe(): Promise<AboutMe> {
  const data = await notionFetch(`/v1/databases/${DB.profile}/query`, {});

  const record = Object.fromEntries(
    (data.results as PageObjectResponse[]).map(mapAboutMe),
  );

  return {
    name: record["name"] ?? "",
    aboutMeImg: record["aboutMeImg"] ?? "",
    aboutMeImgAlt: record["aboutMeImgAlt"] ?? "",
    cvLink: record["cvLink"] ?? "",
    logo: record["logo"] ?? "",
    position: record["position"] ?? "",
    summarize: record["summarize"] ?? "",
  };
}

function mapSection(page: PageObjectResponse): [string, Section] {
  const sectionKey = page.properties["Section Key"];
  const { Title, Description } = page.properties;

  const key =
    sectionKey.type === "title" ? (sectionKey.title[0]?.plain_text ?? "") : "";

  return [
    key,
    {
      title:
        Title.type === "rich_text"
          ? (Title.rich_text[0]?.plain_text ?? "")
          : "",
      description:
        Description.type === "rich_text"
          ? (Description.rich_text[0]?.plain_text ?? "")
          : "",
    },
  ];
}

export async function getSections(): Promise<SectionGroup> {
  const data = await notionFetch(`/v1/databases/${DB.sections}/query`, {});
  return Object.fromEntries(
    (data.results as PageObjectResponse[]).map(mapSection),
  ) as SectionGroup;
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

function mapPortfolioItem(page: PageObjectResponse): ProjectItem {
  const { Name, Key, Description, Images, Technologies, Subtitle } =
    page.properties as Record<
      string,
      Extract<
        PageObjectResponse["properties"][string],
        { type: "title" | "rich_text" | "url" }
      >
    >;

  const coverImageProp = page.properties["Cover Image"] as Extract<
    PageObjectResponse["properties"][string],
    { type: "url" }
  >;

  const rawImages =
    Images.type === "rich_text" ? extractText(Images.rich_text) : "";

  const rawTechonologies =
    Technologies.type === "rich_text"
      ? extractText(Technologies.rich_text)
      : "";

  return {
    id: page.id,
    key: Key.type === "rich_text" ? extractText(Key.rich_text) : "",
    title: Name.type === "title" ? (Name.title[0]?.plain_text ?? "") : "",
    subtitle:
      Subtitle.type === "rich_text"
        ? (Subtitle.rich_text[0]?.plain_text ?? "")
        : "",
    description:
      Description.type === "rich_text"
        ? extractText(Description.rich_text)
        : "",
    coverImage: coverImageProp.type === "url" ? (coverImageProp.url ?? "") : "",
    images: rawImages
      ? rawImages
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean)
      : [],
    technologies: rawTechonologies
      ? rawTechonologies
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean)
      : [],
  };
}

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await notionFetch(`/v1/databases/${DB.projects}/query`, {});
  return (data.results as PageObjectResponse[]).map(mapPortfolioItem);
}

function mapContact(page: PageObjectResponse): Contact {
  const { title, icon, link } = page.properties;
  const linkLabelProp = page.properties["Link Label"] as Extract<
    PageObjectResponse["properties"][string],
    { type: "rich_text" }
  >;

  return {
    id: page.id,
    title: title.type === "title" ? (title.title[0]?.plain_text ?? "") : "",
    icon:
      icon.type === "rich_text" ? (icon.rich_text[0]?.plain_text ?? "") : "",
    link: link.type === "url" ? (link.url ?? "") : "",
    linkLabel:
      linkLabelProp.type === "rich_text"
        ? (linkLabelProp.rich_text[0]?.plain_text ?? "")
        : "",
  };
}

export async function getContacts() {
  const data = await notionFetch(`/v1/databases/${DB.contact}/query`, {});
  return data.results.map(mapContact);
}
