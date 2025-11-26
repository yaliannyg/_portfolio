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
      <div className="flex flex-wrap mt-10 w-full  justify-center m-auto ">
        {portfolio.map(({ img, content, key }) => (
          <div className="max-w-96 w-full sm:w-1/2 lg:w-1/3 flex justify-center p-5" key={key}>
            <WorkCard key={key} img={img} content={content} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionWork;
