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

const BASE = import.meta.env.VITE_API_BASE_URL;

const TABLES = {
  contact: "contact",
  ctaLabels: "ctaLabels",
  details: "meDetails",
  aboutme: "aboutMe",
  projects: "projects",
  sections: "section",
  skills: "skills",
};

async function fetchData<T>(table: string): Promise<T> {
  const res = await fetch(`${BASE}/${table}.json`);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

export async function getCTALabels(): Promise<CTALabels> {
  const data = await fetchData<CTALabels>(TABLES.ctaLabels);

  return data;
}

export async function getAboutMe(): Promise<AboutMe> {
  const data = await fetchData<AboutMe>(TABLES.aboutme);
  return data;
}

export async function getSections(): Promise<SectionGroup> {
  const data = await fetchData<SectionGroup>(TABLES.sections);
  return data;
}

export async function getMeDetails(): Promise<MeDetails[]> {
  const data = await fetchData<MeDetails[]>(TABLES.details);
  return data;
}

export async function getSkills(): Promise<SkillsGroup[]> {
  const data = await fetchData<SkillsGroup[]>(TABLES.skills);
  return data;
}

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await fetchData<ProjectItem[]>(TABLES.projects);
  return data;
}

export async function getContacts(): Promise<Contact[]> {
  const data = await fetchData<Contact[]>(TABLES.contact);
  return data;
}
