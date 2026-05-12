import { cn } from "@/utils";

interface AboutMeSectionProps {
  aboutMeImg?: string;
  aboutMeImgAlt?: string;
  name: string;
  position: string;
  summarize: string;
}

function AboutMeSection({ name, position, summarize }: AboutMeSectionProps) {
  return (
    <div className="flex flex-col w-full flex-wrap ">
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center items-center">
        <div className="flex-1 space-y-2">
          <div className="flex flex-col tracking-widest gap-2">
            <div className="flex gap-2 flex-wrap">
              {name.split(" ").map((value, index) => (
                <h1
                  key={value}
                  className={cn(
                    "text-5xl font-semibold",
                    index + 2 === name.split(" ").length
                      ? "text-on-muted"
                      : null,
                  )}
                >
                  {value}
                </h1>
              ))}
            </div>
            <p className="text-xl font-semibold">{position}</p>
          </div>
          <div className="text-on-surface text-sm font-light leading-6">
            <p className="whitespace-break-spaces">{summarize}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMeSection;
