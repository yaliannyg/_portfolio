import { useEffect, useState } from "react";
import AboutMeDescriptionsCard from "@/components/About/AboutMeDescriptionsCard";
import { getMeDetails } from "@/lib/notion";

function AboutMeDetails() {
  const [details, setDetails] = useState<MeDetailWithDescriptions[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const _details = await getMeDetails();
      setDetails(_details);
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 h-max">
      {details.length
        ? details.map((detail) => (
            <AboutMeDescriptionsCard key={detail.id} {...detail} />
          ))
        : [...new Array(3)].map(() => (
            <div className="flex animate-pulse bg-primary/10 rounded-xl items-center p-4 border border-primary/20 capitalize gap-3 text-sm">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-900"></div>
              <div className="flex flex-col flex-1 gap-1">
                <div className="bg-slate-900 h-4 rounded-2xl"></div>
                <div className="bg-slate-900 h-8 rounded-2xl"></div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default AboutMeDetails;
