import { useEffect, useState } from "react";
import SectionsTitle from "@/components/SectionsTitle";
import { getContacts, type Contact } from "@/lib/notion";

function ContactMeSection() {
  const [info, setInfo] = useState<Contact[]>([]);

  function redirectTo(link: string) {
    window.open(link);
  }
  useEffect(() => {
    const fecthData = async () => {
      const contacts = await getContacts();

      setInfo(contacts);
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
            key={contact.id}
            onClick={() => redirectTo(contact.link)}
          >
            {JSON.stringify(contact)}
            {/* <SmallCard key={contact.id} {...contact} /> */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContactMeSection;
