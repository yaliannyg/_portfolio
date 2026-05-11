function AboutMeSectionSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full">
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-center items-center">
        <div className="flex-1 space-y-2">
          <div className="flex flex-col tracking-widest gap-2">
            <div className="flex flex-col gap-1">
              <div className="bg-slate-800 h-10 w-48 rounded-2xl"></div>
              <div className="bg-primary/30 h-10 w-40 rounded-2xl"></div>
            </div>
            <div className="bg-slate-800 h-4 w-36 rounded-2xl"></div>
          </div>
          <div className="flex flex-col gap-2 pt-1 max-w-xl">
            <div className="bg-slate-800 h-3 w-full rounded-2xl"></div>
            <div className="bg-slate-800 h-3 w-5/6 rounded-2xl"></div>
            <div className="bg-slate-800 h-3 w-4/6 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMeSectionSkeleton;
