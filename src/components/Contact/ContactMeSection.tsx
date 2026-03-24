import { use } from "react";
import ContactCard from "../Contact/ContactCard";
import { contactsPromise } from "@/lib/queries";

function ContactMeSection() {
  function redirectTo(link: string) {
    window.open(link);
  }
  const contactInfo = use(contactsPromise);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
      {contactInfo.map((contact) => (
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
