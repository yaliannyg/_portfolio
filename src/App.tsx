import { useEffect, useState } from "react";
import { type Icon } from "./assets/icons";
import WorkSection from "./components/Work/WorkSection";
// import HeaderSection from "@/components/Header/HeaderSection";
import AboutMeSection from "./components/About/AboutMeSection";
import ContactMeSection from "./components/Contact/ContactMeSection";
import Navbar from "./components/Navbar";
import {
  getMeDetails,
  getProfile,
  type MeDetailWithDescriptions,
  type PortfolioProfile,
} from "./lib/notion";
import AboutMeDetails from "./components/About/AboutMeDetails";
import SectionsTitle from "./components/SectionsTitle";
import SkillsGrid from "./components/Skills/SkillsGrid";
export const LetsTalkBtn = () => (
  <a className="btn " href="#contact">
    Contact Me
  </a>
);

export interface IDetail {
  index: number;
  icon: Icon;
  title: string;
  description: string[];
}

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
        <div className="md:max-w-4xl m-auto  ">
          <Navbar cvLink={data.cvLink} logo={data.logo} />

          <section
            className="flex flex-col py-12 pt-24 w-full gap-4"
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

          <section id="skills">
            <SectionsTitle
              description={data.section_skills.description}
              title={data.section_skills.title}
            />

            <SkillsGrid />
          </section>

          {/* <section id="work">
            <WorkSection />
          </section>
          <section id="contact">
            <ContactMeSection />
          </section> */}
        </div>
      </main>
    )
  );
}

export default App;
