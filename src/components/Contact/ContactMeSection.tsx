import { use } from "react";
import ContactCard from "../Contact/ContactCard";
import { contactsPromise } from "@/lib/queries";
import { usePostHog } from "@posthog/react";

function ContactMeSection() {
  const posthog = usePostHog();

  function redirectTo(link: string, title: string) {
    posthog?.capture("contact_link_clicked", { contact_type: title, link });
    window.open(link);
  }
  const contactInfo = use(contactsPromise);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
      {contactInfo.map((contact) => (
        <button
          className="border-0 p-0"
          key={contact.id}
          onClick={() => redirectTo(contact.link, contact.title)}
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
