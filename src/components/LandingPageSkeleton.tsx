import AboutMeDescriptionsCardSkeleton from "./About/AboutMeDescriptionsCardSkeleton";
import AboutMeSectionSkeleton from "./About/AboutMeSectionSkeleton";
import ContactMeSectionSkeleton from "./Contact/ContactMeSectionSkeleton";
import Footer from "./Footer";
import Loader from "./Loader";
import SectionsTitle from "./SectionsTitle";
import SkillsGridSkeleton from "./Skills/SkillsGridSkeleton";
import ProjectCardSkeleton from "./Work/ProjectCardSkeleton";

function LandingPageSkeleton() {
  return (
    <main className="text-white bg-linear-to-br from-slate-950 to-slate-800 max-h-screen p-5 relative overflow-hidden">
      <Loader />

      <div className="md:max-w-4xl m-auto px-10 bg-transparent">
        <nav className="fixed w-full flex items-center py-2 gap-2 bg-transparent backdrop-blur-xl rounded-full top-2 z-50 left-1/2 -translate-x-1/2 px-5 animate-pulse">
          <div className="bg-slate-800 h-7 w-20 rounded-full"></div>
          <ul className="flex mx-auto gap-2">
            {[...new Array(4)].map((_, i) => (
              <li key={i} className="bg-slate-800 h-6 w-14 rounded-full"></li>
            ))}
          </ul>
          <div className="sm:flex gap-2 hidden">
            <div className="bg-slate-800 h-8 w-24 rounded-full"></div>
            <div className="bg-slate-800 h-8 w-20 rounded-full"></div>
          </div>
        </nav>

        <section className="flex flex-col pb-12 pt-24 w-full gap-4" id="about">
          <div>
            <SectionsTitle />
            <AboutMeSectionSkeleton />
            <div className="flex gap-2 mt-3 animate-pulse">
              <div className="bg-primary/10 h-9 w-28 rounded-full"></div>
              <div className="bg-primary/30 h-9 w-20 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 h-max">
            {[...new Array(3)].map((_, i) => (
              <AboutMeDescriptionsCardSkeleton key={i} />
            ))}
          </div>
        </section>

        <section id="skills" className="pb-12">
          <SectionsTitle />
          <SkillsGridSkeleton />
        </section>

        <section id="projects" className="pb-12">
          <SectionsTitle />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-5 w-full m-auto h-fit">
            {[...new Array(5)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </section>

        <section id="contact">
          <SectionsTitle />
          <ContactMeSectionSkeleton />
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default LandingPageSkeleton;
