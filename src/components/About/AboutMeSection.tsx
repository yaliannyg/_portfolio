import SmallCard from "@/components/SmallCard";
import SectionsTitle from "@/components/SectionsTitle";
import { LetsTalkBtn, type IDetail } from "@/App";

interface IProps {
  details: IDetail[];
  summarize: string;
  aboutMeImg: string;
  aboutMeImgAlt: string;
}

function AboutMeSection({
  details,
  summarize,
  aboutMeImg,
  aboutMeImgAlt,
}: IProps) {
  return (
    <>
      <SectionsTitle title="About me" subtitle="Get to know" />
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        <div className="w-1/3 relative flex justify-center items-center m-auto h-[335px] min-w-[293px]">
          <div className="size-full bg-primary absolute top-0 rounded-2xl "></div>
          <img
            src={aboutMeImg}
            alt={aboutMeImgAlt}
            className="-rotate-6 rounded-2xl size-full shadow-2xs  "
          />
        </div>
        <section className="flex-1 min-w-0" id="about_me_details">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-max">
            {details.map((detail) => (
              <SmallCard key={detail.index} {...detail} />
            ))}
          </div>

          <div className="flex flex-col space-y-5" id="summarize-aboutme">
            <p className="pt-12 text-justify ">{summarize}</p>
            <div className="w-max flex">
              <LetsTalkBtn />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutMeSection;
