import { use, Suspense } from "react";
import { useCTALabels } from "./context/CtaContext";
import Navbar from "./components/Navbar";
import SectionsTitle from "./components/SectionsTitle";
import AboutMeDetails from "./components/About/AboutMeDetails";
import AboutMeSection from "./components/About/AboutMeSection";
import ContactMeSection from "./components/Contact/ContactMeSection";
import SkillsGrid from "./components/Skills/SkillsGrid";
import ProjectsSection from "./components/Work/ProjectsSection";
import { aboutMePromise, sectionPromise } from "./lib/queries";
import AboutMeDescriptionsCardSkeleton from "./components/About/AboutMeDescriptionsCardSkeleton";
import ProjectCardSkeleton from "./components/Work/ProjectCardSkeleton";
import SkillsGridSkeleton from "./components/Skills/SkillsGridSkeleton";
import ContactMeSectionSkeleton from "./components/Contact/ContactMeSectionSkeleton";

type SectionKey = "section_about_me" | "section_skills" | "section_projects" | "section_contact";

function SectionHeader({ sectionKey }: { sectionKey: SectionKey }) {
  const sections = use(sectionPromise);
  const section = sections[sectionKey];
  return <SectionsTitle description={section.description} title={section.title} />;
}

function App() {
  const labels = useCTALabels();
  const aboutMe = use(aboutMePromise);

  return (
    aboutMe &&
    labels && (
      <main className="text-white bg-linear-to-br from-slate-950 to-slate-800 min-h-screen p-5 relative">
        <div className="md:max-w-4xl m-auto px-10 ">
          <Navbar cvLink={aboutMe.cvLink} logo={aboutMe.logo} cta={labels} />

          <section
            className="flex flex-col pb-12 pt-24 w-full gap-4"
            id="about"
          >
            <div>
              <Suspense fallback={<SectionsTitle />}>
                <SectionHeader sectionKey="section_about_me" />
              </Suspense>
              <AboutMeSection
                aboutMeImg={aboutMe.aboutMeImg}
                aboutMeImgAlt={aboutMe.aboutMeImgAlt}
                name={aboutMe.name}
                position={aboutMe.position}
                summarize={aboutMe.summarize}
              />

              <div className="flex gap-2 mt-3">
                <a
                  className="btn rounded-full text-sm text-primary leading-none bg-primary/10"
                  href={aboutMe.cvLink}
                  target="_blank"
                >
                  {labels.Link.download_cv_btn}
                </a>
                <a
                  className="btn rounded-full text-sm text-variant leading-none bg-primary"
                  href="#contact"
                >
                  {labels.Link.talk_btn}
                </a>
              </div>
            </div>
            <div>
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 h-max">
                    {[...new Array(3)].map((_, i) => (
                      <AboutMeDescriptionsCardSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <AboutMeDetails />
              </Suspense>
            </div>
          </section>

          <section id="skills" className="pb-12">
            <Suspense fallback={<SectionsTitle />}>
              <SectionHeader sectionKey="section_skills" />
            </Suspense>
            <Suspense fallback={<SkillsGridSkeleton />}>
              <SkillsGrid />
            </Suspense>
          </section>

          <section id="projects" className="pb-12">
            <Suspense fallback={<SectionsTitle />}>
              <SectionHeader sectionKey="section_projects" />
            </Suspense>
            <Suspense
              fallback={
                <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-5 w-full m-auto h-fit">
                  {[...new Array(5)].map((_, i) => (
                    <ProjectCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <ProjectsSection />
            </Suspense>
          </section>
          <section id="contact">
            <Suspense fallback={<SectionsTitle />}>
              <SectionHeader sectionKey="section_contact" />
            </Suspense>
            <Suspense fallback={<ContactMeSectionSkeleton />}>
              <ContactMeSection />
            </Suspense>
          </section>
        </div>
      </main>
    )
  );
}

export default App;
