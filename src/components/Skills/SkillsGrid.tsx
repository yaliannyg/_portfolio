import { skillsGroupedPromise } from "@/lib/queries";
import { cn } from "@/utils";
import { use } from "react";

function SkillsGrid() {
  const skillsGroups = use(skillsGroupedPromise);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-3 w-full m-auto">
      {skillsGroups.map(({ category, skills }) => (
        <div
          key={`${category}`}
          className="flex flex-col bg-muted/30 rounded-xl p-4 border border-border capitalize gap-3 text-sm"
        >
          <span className="font-semibold text-on-muted text-sm uppercase">
            {category}
          </span>

          <div className="flex flex-col items-center gap-2.5">
            {skills.map((_skill) => (
              <div
                className="flex w-full items-center leading-none"
                key={_skill.id}
              >
                <div className="flex flex-1 gap-2 items-center">
                  <div
                    className={cn(
                      "size-1.5 rounded-full",

                      _skill.level === "Intermediate"
                        ? "bg-on-muted/50"
                        : "bg-on-muted",
                    )}
                  ></div>
                  <div className="text-xs">{_skill.name}</div>
                </div>
                <div className="font-semibold text-[10px] text-on-muted/70">
                  {_skill.level}・<span>{_skill.years} years</span>
                </div>
              </div>
            ))}

            <div />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsGrid;
