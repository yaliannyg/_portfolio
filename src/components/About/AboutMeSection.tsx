import { cn } from "@/utils";

interface AboutMeSectionProps {
  aboutMeImg: string;
  aboutMeImgAlt: string;
  name: string;
  position: string;
  summarize: string;
}

function AboutMeSection({
  aboutMeImg,
  aboutMeImgAlt,
  name,
  position,
  summarize,
}: AboutMeSectionProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center items-center">
        <div className="flex-1 space-y-2">
          <div className="flex flex-col tracking-widest gap-2">
            <div>
              {name.split(" ").map((value, index) => (
                <h1
                  key={value}
                  className={cn(
                    "text-5xl font-semibold",
                    index + 1 === name.split(" ").length
                      ? "text-primary"
                      : null,
                  )}
                >
                  {value}
                </h1>
              ))}
            </div>
            <p>{position}</p>
          </div>
          <div className="text-gray-400 text-sm font-light max-w-xl leading-6">
            <p className="whitespace-break-spaces">{summarize}</p>
          </div>
        </div>
        <div className="w-auto h-40 sm:w-52 sm:h-60 ">
          <img
            src={aboutMeImg}
            alt={aboutMeImgAlt}
            className="sm:rounded-2xl rounded-full size-full shadow-2xs  "
          />
        </div>
      </div>
    </div>
  );
}

export default AboutMeSection;
