import { useEffect, useState } from "react";
import AboutMeDescriptionsCard from "@/components/About/AboutMeDescriptionsCard";
import { getMeDetails, type MeDetails } from "@/lib/notion";
import AboutMeDescriptionsCardSkeleton from "./AboutMeDescriptionsCardSkeleton";

function AboutMeDetails() {
  const [details, setDetails] = useState<MeDetails[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const _details = await getMeDetails();
      setDetails(_details);
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 h-max">
      {details.length
        ? details.map((detail) => (
            <AboutMeDescriptionsCard key={detail.id} {...detail} />
          ))
        : [...new Array(3)].map((_value, index) => (
            <div key={`about-me-skeleton-${index}`}>
              <AboutMeDescriptionsCardSkeleton
                key={`about-me-skeleton-${index}`}
              />
            </div>
          ))}
    </div>
  );
}

export default AboutMeDetails;
