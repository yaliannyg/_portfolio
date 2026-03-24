import { getAllData } from "./notion";

const allDataPromise = getAllData();

export const appDataPromise = allDataPromise.then(
  (d) => [d.aboutMe, d.sections] as const,
);
export const contactsPromise = allDataPromise.then((d) => d.contacts);
export const projectsPromise = allDataPromise.then((d) => d.projects);
export const meDetailsPromise = allDataPromise.then((d) => d.meDetails);
export const skillsGroupedPromise = allDataPromise.then((d) => d.skillsGrouped);
export const ctaLabelsPromise = allDataPromise.then((d) => d.ctaLabels);
