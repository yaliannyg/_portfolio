import { use } from "react";
import AboutMeDescriptionsCard from "@/components/About/AboutMeDescriptionsCard";
import { meDetailsPromise } from "@/lib/queries";

function AboutMeDetails() {
  const details = use(meDetailsPromise);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 h-max">
      {details.map((detail) => (
        <AboutMeDescriptionsCard key={detail.id} {...detail} />
      ))}
    </div>
  );
}

export default AboutMeDetails;
