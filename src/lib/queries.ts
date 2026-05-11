import {
  getAboutMe,
  getSections,
  getMeDetails,
  getSkills,
  getProjects,
  getContacts,
  getCTALabels,
} from "./data";

const delay = new Promise<void>((resolve) => setTimeout(resolve, 1500));

const ctaData = getCTALabels();
const aboutMeData = getAboutMe();
export const sectionPromise = getSections();
export const contactsPromise = getContacts();
export const projectsPromise = getProjects();
export const meDetailsPromise = getMeDetails();
export const skillsGroupedPromise = getSkills();

export const ctaPromise = Promise.all([ctaData, delay]).then(([data]) => data);
export const aboutMePromise = Promise.all([aboutMeData, delay]).then(
  ([data]) => data,
);
