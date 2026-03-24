import {
  getAboutMe,
  getSections,
  getMeDetails,
  getSkillsGrouped,
  getProjects,
  getContacts,
  getCTALabels,
} from "./notion";

export const appDataPromise = Promise.all([getAboutMe(), getSections()]);
export const contactsPromise = getContacts();
export const projectsPromise = getProjects();
export const meDetailsPromise = getMeDetails();
export const skillsGroupedPromise = getSkillsGrouped();
export const ctaLabelsPromise = getCTALabels();
