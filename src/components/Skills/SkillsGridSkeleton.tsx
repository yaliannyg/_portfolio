import { cn } from "@/utils";

function SkillsGridSkeleton() {
  return (
    <div className="animate-pulse grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-3 w-full m-auto">
      {[...new Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-primary/10 rounded-xl p-4 border border-primary/20 gap-3"
        >
          <div className="bg-slate-900 h-5 rounded-2xl"></div>

          <div className="flex flex-col items-center gap-2.5">
            {[...new Array(3)].map((_, index) => (
              <div
                className="flex w-full items-center leading-none h-4 gap-2.5"
                key={index}
              >
                <div className="flex flex-1 gap-2 items-center h-full">
                  <div
                    className={cn(
                      "rounded-full size-1.5",
                      index % 2 === 0 ? "bg-primary/50" : "bg-primary",
                    )}
                  ></div>
                  <div className="bg-slate-900 h-full flex-1 rounded-2xl"></div>
                </div>
                <div className="bg-slate-900 w-1/4 rounded-2xl h-2"></div>
              </div>
            ))}

            <div />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsGridSkeleton;
