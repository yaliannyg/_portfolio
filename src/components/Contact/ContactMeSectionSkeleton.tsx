function ContactMeSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
      {[...new Array(2)].map((_, index) => (
        <div
          className="flex bg-muted/30 rounded-xl p-4 border border-border gap-3 h-16"
          key={index}
        >
          <div className="size-5 bg-on-muted m-auto rounded-2xl"></div>

          <div className="flex flex-col flex-1 gap-1">
            <div className="bg-on-muted h-4 rounded-2xl"></div>

            <div className="h-5 bg-on-muted rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactMeSectionSkeleton;
