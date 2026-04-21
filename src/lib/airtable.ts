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
  years: number | null;
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
  order: number;
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

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

const BASE = import.meta.env.VITE_AIRTABLE_BASE_ID;

const TABLES = {
  contact: "contact",
  ctaLabels: "ctaLabels",
  details: "details",
  aboutme: "aboutme",
  projects: "projects",
  sections: "sections",
  skills: "skills",
};

async function airtableFetch(table: string): Promise<AirtableResponse> {
  const res = await fetch(`/airtable/v0/${BASE}/${table}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Airtable error: ${res.status}`);
  return res.json();
}

export async function getCTALabels(): Promise<CTALabels> {
  const data = await airtableFetch(TABLES.ctaLabels);

  const initial: CTALabels = { Button: {}, Navigation: {}, Link: {} };

  return data.records.reduce((acc, record) => {
    const { fields } = record;
    const type = fields["Type"] as CTAType;
    const key = fields["Key"] as string;
    const label = fields["Label"] as string;

    if (!type || !key) return acc;

    return {
      ...acc,
      [type]: { ...acc[type], [key]: label },
    };
  }, initial);
}

export async function getAboutMe(): Promise<AboutMe> {
  const data = await airtableFetch(TABLES.aboutme);

  const record = Object.fromEntries(
    data.records.map((r) => [
      r.fields["Key"] as string,
      r.fields["Value"] as string,
    ]),
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

export async function getSections(): Promise<SectionGroup> {
  const data = await airtableFetch(TABLES.sections);

  return Object.fromEntries(
    data.records.map((r) => {
      const { fields } = r;
      const desc = fields["Description"];
      const description = Array.isArray(desc)
        ? desc.join(" ")
        : ((desc as string) ?? "");
      return [
        fields["Section Key"] as string,
        { title: fields["Title"] as string, description },
      ];
    }),
  ) as SectionGroup;
}

export async function getMeDetails(): Promise<MeDetails[]> {
  const data = await airtableFetch(TABLES.details);

  return data.records.map((r) => {
    const { fields } = r;
    return {
      id: r.id,
      title: fields["Title"] as string,
      icon: fields["Icon"] as string,
      description: fields["Description"] as string,
    };
  });
}

export async function getSkills(): Promise<Skill[]> {
  const data = await airtableFetch(TABLES.skills);

  return data.records.map((r) => {
    const { fields } = r;
    const years = fields["Years"];
    return {
      id: r.id,
      name: fields["Name"] as string,
      category: fields["Category"] as SkillCategory,
      level: fields["Level"] as SkillLevel,
      years: typeof years === "number" ? years : null,
    };
  });
}

export async function getSkillsGrouped(): Promise<SkillsGroup[]> {
  const skills = await getSkills();

  const order: SkillCategory[] = ["Front-End", "Back-End", "Others"];

  return order.map((category) => ({
    category,
    skills: skills.filter((s) => s.category === category),
  }));
}

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await airtableFetch(TABLES.projects);

  return data.records.map((r) => {
    const { fields } = r;
    const rawImages = fields["Images"] as string;
    const order = fields["Order"];

    return {
      id: r.id,
      key: fields["Key"] as string,
      order: typeof order === "number" ? order : 0,
      title: fields["Name"] as string,
      subtitle: fields["Subtitle"] as string,
      description: fields["Description"] as string,
      coverImage: fields["Cover Image"] as string,
      images: rawImages
        ? rawImages
            .split(",")
            .map((u: string) => u.trim())
            .filter(Boolean)
        : [],
      technologies: ((fields["Technologies"] as string[]) ?? [])
        .map((t) => t.trim())
        .filter(Boolean),
    };
  });
}

export async function getContacts(): Promise<Contact[]> {
  const data = await airtableFetch(TABLES.contact);

  return data.records.map((r) => {
    const { fields } = r;
    return {
      id: r.id,
      title: fields["Title"] as string,
      icon: fields["Icon"] as string,
      link: fields["Link"] as string,
      linkLabel: fields["Link Label"] as string,
    };
  });
}
