import { useState, useEffect } from "react";
import SectionsTitle from "../SectionsTitle";
import type { IProps } from "./WorkCard";
import WorkCard from "./WorkCard";

interface IPortfolio extends IProps {
  key: string;
}

interface Data {
  portfolio: IPortfolio[];
}

function SectionWork() {
  const [portfolio, setPortfolio] = useState<IPortfolio[]>([]);

  useEffect(() => {
    fetch("/data/work.json")
      .then((res) => res.json())
      .then((data) => {
        const { portfolio }: Data = data;
        setPortfolio(portfolio);
      });
  }, []);

  return (
    <div className="mt-10">
      <SectionsTitle title="portfolio" subtitle="my work" />
      <div className="flex flex-wrap mt-10 md:w-full lg:w-4/5  justify-center m-auto ">
        {portfolio.map(({ img, content, key }) => (
          <div className="w-96 flex justify-center p-5" key={key}>
            <WorkCard key={key} img={img} content={content} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionWork;
