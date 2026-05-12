function AboutMeDescriptionsCardSkeleton() {
  return (
    <div className="flex animate-pulse bg-muted/30 rounded-xl items-center p-4 border border-border capitalize gap-3 text-sm">
      <div className="bg-muted p-4 rounded-xl border border-border"></div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="bg-on-muted h-4 rounded-2xl"></div>
        <div className="bg-on-muted h-8 rounded-2xl"></div>
      </div>
    </div>
  );
}

export default AboutMeDescriptionsCardSkeleton;
