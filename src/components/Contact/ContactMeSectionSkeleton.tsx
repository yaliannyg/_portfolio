function ContactMeSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
      {[...new Array(2)].map((_, index) => (
        <div
          className="flex bg-primary/10 rounded-xl p-4 border border-primary/20 gap-3 h-16"
          key={index}
        >
          <div className="size-5 bg-slate-900 m-auto rounded-2xl"></div>

          <div className="flex flex-col flex-1 gap-1">
            <div className="bg-slate-900 h-4 rounded-2xl"></div>

            <div className="h-5 bg-slate-900 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactMeSectionSkeleton;
