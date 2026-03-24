import {
  getAboutMe,
  getSections,
  getMeDetails,
  getSkillsGrouped,
  getProjects,
  getContacts,
  getCTALabels,
} from "./notion";

export const ctaPromise = getCTALabels();
export const aboutMePromise = getAboutMe();

const afterPriority = Promise.all([ctaPromise, aboutMePromise]);

export const sectionPromise = afterPriority.then(() => getSections());
export const contactsPromise = afterPriority.then(() => getContacts());
export const projectsPromise = afterPriority.then(() => getProjects());
export const meDetailsPromise = afterPriority.then(() => getMeDetails());
export const skillsGroupedPromise = afterPriority.then(() => getSkillsGrouped());
