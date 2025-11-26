import { useEffect, useState } from "react";
import { type Icon } from "./assets/icons";
import WorkSection from "./components/Work/WorkSection";
import HeaderSection from "@/components/Header/HeaderSection";
import AboutMeSection from "./components/About/AboutMeSection";
import SkillsSections from "./components/Skills/SkillsSections";
import ContactMeSection from "./components/Contact/ContactMeSection";

export const LetsTalkBtn = () => (
  <a className="btn btn-primary" href="#contact">
    Lets talk
  </a>
);

export interface IDetail {
  index: number;
  icon: Icon;
  title: string;
  description: string[];
}

interface IData {
  name: string;
  position: string;
  aboutMeImg: string;
  aboutMeImgAlt: string;
  details: IDetail[];
  summarize: string;
}

function App() {
  const [data, setData] = useState<IData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/me.json");
      const data: IData = await res.json();

      setData(data);
    };
    fetchData();
  }, []);
  return (
    data && (
      <main className="app ">
        <section id="header">
          <HeaderSection name={data.name} position={data.position} />
        </section>

        <section
          className="flex justify-center items-center flex-col px-12 py-12 "
          id="about"
        >
          <div className="container max-w-5xl">
            <AboutMeSection
              details={data.details}
              summarize={data.summarize}
              aboutMeImg={data.aboutMeImg}
              aboutMeImgAlt={data.aboutMeImgAlt}
            />
          </div>
        </section>

        <section id="skills" className=" ">
          <SkillsSections />
        </section>

        <section id="work">
          <WorkSection />
        </section>
        <section id="contact">
          <ContactMeSection />
        </section>
      </main>
    )
  );
}

export default App;
