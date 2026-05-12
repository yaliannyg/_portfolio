import {
  getAboutMe,
  getSections,
  getMeDetails,
  getSkills,
  getProjects,
  getContacts,
  getCTALabels,
} from "./data";

export const sectionPromise = getSections();
export const contactsPromise = getContacts();
export const projectsPromise = getProjects();
export const meDetailsPromise = getMeDetails();
export const skillsGroupedPromise = getSkills();

export const ctaPromise = getCTALabels();
export const aboutMePromise = getAboutMe();
