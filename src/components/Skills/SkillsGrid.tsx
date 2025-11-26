import { StarIcon } from "@/assets/icons/index";
import { useEffect, useState } from "react";

type level = "Experienced" | "Intermediate" | "Beginner";
type category = "FE" | "BE" | "Other";
type ISkills = Record<category, IUISection>;

interface ITech {
  name: string;
  level: level;
}

interface IUISection {
  name: string;
  techs: ITech[];
}

function SkillsGrid() {
  const [skills, setSkills] = useState<ISkills | null>(null);

  useEffect(() => {
    const fecthData = async () => {
      const res = await fetch("/data/skills.json");
      const data: ISkills = await res.json();

      setSkills(data);
    };
    fecthData();
  }, []);
  return (
    skills && (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 px-5 gap-3 w-fit m-auto">
        {(Object.keys(skills) as category[]).map((category, index) => (
          <div
            key={index}
            className={`flex flex-col border border-primary rounded-3xl px-5 py-4 justify-center h-max gap-4 w-full 
             ${index === 0 ? "col-start-1 row-span-2" : ``}`}
          >
            <span className="text-center font-black">
              {skills[category].name}
            </span>
            <div className="grid grid-cols-2 items-center">
              {skills[category].techs.map(({ name, level }) => (
                <div
                  key={name}
                  className="flex justify-center items-center w-min px-5 py-2"
                >
                  <StarIcon className="text-primary fill-primary" />
                  <div className=" flex-1 flex flex-col px-2 ">
                    <span className="wrap-break-word ">{name}</span>
                    <span className="text-xs text-white/50">{level}</span>
                  </div>
                </div>
              ))}
              <div />
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default SkillsGrid;
