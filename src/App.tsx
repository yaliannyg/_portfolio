import { useEffect, useState } from "react";
import {
  getAboutMe,
  getSections,
  type AboutMe,
  type SectionGroup,
} from "./lib/notion";
import { useCTALabels } from "./context/CtaContext";
import Navbar from "./components/Navbar";
import SectionsTitle from "./components/SectionsTitle";
import AboutMeDetails from "./components/About/AboutMeDetails";
import AboutMeSection from "./components/About/AboutMeSection";
import ContactMeSection from "./components/Contact/ContactMeSection";
import SkillsGrid from "./components/Skills/SkillsSection";
import ProjectsSection from "./components/Work/ProjectsSection";

function App() {
  const labels = useCTALabels();
  const [aboutMe, setAboutMe] = useState<AboutMe>();
  const [sections, setSections] = useState<SectionGroup>();

  useEffect(() => {
    const fetchData = async () => {
      const [_aboutMe, _sections]: [AboutMe, SectionGroup] = await Promise.all([
        getAboutMe(),
        getSections(),
      ]);

      setAboutMe(_aboutMe);
      setSections(_sections);
    };
    fetchData();
  }, []);

  return (
    aboutMe &&
    labels &&
    sections && (
      <main className="text-white bg-linear-to-br from-slate-950 to-slate-800 min-h-screen p-5 relative">
        <div className="md:max-w-4xl m-auto px-10 ">
          <Navbar cvLink={aboutMe.cvLink} logo={aboutMe.logo} cta={labels} />

          <section
            className="flex flex-col pb-12 pt-24 w-full gap-4"
            id="about"
          >
            <div>
              <SectionsTitle
                description={sections.section_about_me.description}
              />
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
              <AboutMeDetails />
            </div>
          </section>

          <section id="skills" className="pb-12">
            <SectionsTitle
              description={sections.section_skills.description}
              title={sections.section_skills.title}
            />

            <SkillsGrid />
          </section>

          <section id="projects" className="pb-12">
            <SectionsTitle
              description={sections.section_projects.description}
              title={sections.section_projects.title}
            />
            <ProjectsSection />
          </section>
          <section id="contact">
            <SectionsTitle
              description={sections.section_contact.description}
              title={sections.section_contact.title}
            />
            <ContactMeSection />
          </section>
        </div>
      </main>
    )
  );
}

export default App;
