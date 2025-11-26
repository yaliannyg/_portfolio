import { useEffect, useState } from "react";
import { type IDetail } from "@/App";
import SmallCard from "@/components/SmallCard";
import SectionsTitle from "@/components/SectionsTitle";

interface IContact extends IDetail {
  link: string;
}
interface IData {
  contact_info: IContact[];
}

function ContactMeSection() {
  const [info, setInfo] = useState<IContact[]>([]);

  function redirectTo(link: string) {
    window.open(link);
  }
  useEffect(() => {
    const fecthData = async () => {
      const res = await fetch("/data/contact.json");
      const data: IData = await res.json();
      const { contact_info } = data;
      setInfo(contact_info);
    };
    fecthData();
  }, []);
  return (
    <div className="m-10 pb-10">
      <SectionsTitle title="Contact Me" subtitle="Get In Touch" />
      <div className="grid grid-cols-1 sm:grid-cols-2 w-fit m-auto gap-5 mt-10">
        {info.map((contact) => (
          <button
            className="btn border-0 p-0"
            key={contact.index}
            onClick={() => redirectTo(contact.link)}
          >
            <SmallCard key={contact.index} {...contact} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContactMeSection;
