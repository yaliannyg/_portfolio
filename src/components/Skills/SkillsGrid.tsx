import { getSkillsGrouped, type SkillsGroup } from "@/lib/notion";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

function SkillsGrid() {
  const [skills, setSkills] = useState<SkillsGroup[]>();

  useEffect(() => {
    const fecthData = async () => {
      const _skills = await getSkillsGrouped();

      setSkills(_skills);
    };
    fecthData();
  }, []);
  return (
    skills && (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-3 w-full m-auto">
        {skills.map((group) => (
          <div
            key={group.category}
            className="flex flex-col bg-primary/10 rounded-xl p-4 border border-primary/20 capitalize gap-3 text-sm"
          >
            <span className="font-semibold text-gray-400 text-sm uppercase">
              {group.category}
            </span>

            <div className="flex flex-col items-center gap-2.5">
              {group.skills.map((_skill) => (
                <div className="flex w-full items-center leading-none">
                  <div className="flex flex-1 gap-2 items-center">
                    <div
                      className={cn(
                        "size-1.5 rounded-full",

                        _skill.level === "Intermediate"
                          ? "bg-primary/50"
                          : "bg-primary",
                      )}
                    ></div>
                    <div className="text-xs">{_skill.name}</div>
                  </div>
                  <div className="font-semibold text-[10px] text-gray-400 ">
                    {_skill.level}
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
