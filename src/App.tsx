import { useEffect, useState } from "react";
import { getProfile, type PortfolioProfile } from "./lib/notion";
import AboutMeDetails from "./components/About/AboutMeDetails";
import AboutMeSection from "./components/About/AboutMeSection";
import ContactMeSection from "./components/Contact/ContactMeSection";
import Navbar from "./components/Navbar";
import SectionsTitle from "./components/SectionsTitle";
import SkillsGrid from "./components/Skills/SkillsSection";
import ProjectsSection from "./components/Work/ProjectsSection";

function App() {
  const [data, setData] = useState<PortfolioProfile>();

  useEffect(() => {
    const fetchData = async () => {
      const porfolio: PortfolioProfile = await getProfile();

      setData(porfolio);
    };
    fetchData();
  }, []);

  return (
    data && (
      <main className="text-white bg-linear-to-br from-slate-950 to-slate-800 min-h-screen p-5 relative">
        <div className="md:max-w-4xl m-auto px-10 ">
          <Navbar cvLink={data.cvLink} logo={data.logo} />

          <section
            className="flex flex-col pb-12 pt-24 w-full gap-4"
            id="about"
          >
            <div>
              <SectionsTitle description={data.section_about_me.description} />
              <AboutMeSection
                aboutMeImg={data.aboutMeImg}
                aboutMeImgAlt={data.aboutMeImgAlt}
                name={data.name}
                position={data.position}
                summarize={data.summarize}
              />

              <div className="flex gap-2 mt-3">
                <a
                  className="btn rounded-full text-sm text-primary leading-none bg-primary/10"
                  href={data.cvLink}
                  target="_blank"
                >
                  Download CV
                </a>
                <a
                  className="btn rounded-full text-sm text-variant leading-none bg-primary"
                  href="#contact"
                >
                  Contact Me
                </a>
              </div>
            </div>
            <div>
              <AboutMeDetails />
            </div>
          </section>

          <section id="skills" className="pb-12">
            <SectionsTitle
              description={data.section_skills.description}
              title={data.section_skills.title}
            />

            <SkillsGrid />
          </section>

          <section id="projects" className="pb-12">
            <SectionsTitle
              description={data.section_projects.description}
              title={data.section_projects.title}
            />
            <ProjectsSection />
          </section>
          <section id="contact">
            <SectionsTitle
              description={data.section_contact.description}
              title={data.section_contact.title}
            />
            <ContactMeSection />
          </section>
        </div>
      </main>
    )
  );
}

export default App;
