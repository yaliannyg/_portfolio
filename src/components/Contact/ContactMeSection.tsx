import { useEffect, useState } from "react";
import { getContacts, type Contact } from "@/lib/notion";
import ContactCard from "../Contact/ContactCard";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
      {info.map((contact) => (
        <button
          className="border-0 p-0"
          key={contact.id}
          onClick={() => redirectTo(contact.link)}
        >
          <ContactCard
            id={contact.id}
            key={contact.id}
            icon={contact.icon}
            title={contact.title}
            link={contact.link}
            linkLabel={contact.linkLabel}
          />
        </button>
      ))}
    </div>
  );
}

export default ContactMeSection;
