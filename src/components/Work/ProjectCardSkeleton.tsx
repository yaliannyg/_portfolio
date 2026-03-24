function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full max-w-64 bg-slate-900 border-variant/70 border rounded-xl m-auto h-full">
      <div className="rounded-t-xl h-28 object-cover object-center w-full bg-slate-800"></div>

      <div className="px-3.5 py-4 flex-1 flex flex-col h-56">
        <div className="bg-slate-800 h-5 rounded-2xl mb-1.5"></div>

        <div className="mb-3 h-20 bg-slate-800 rounded-2xl"></div>

        <div className="flex gap-3 mb-3 h-4">
          {[...new Array(3)].map((tech,index) => (
            <div key={index} className="bg-primary/30 rounded-sm h-full w-12">
              <span>{tech}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto h-9 rounded-lg w-full bg-primary/10 border border-primary/10"></div>
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;
