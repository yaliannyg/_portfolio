import type { Contact } from "@/lib/notion";
import {
  IconMessage2,
  IconSchool,
  IconDeviceDesktop,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

function ContactCard({ link, linkLabel, icon, title }: Contact) {
  const icons = {
    graduation: IconSchool,
    dictionary: IconMessage2,
    computer: IconDeviceDesktop,
    linkedIn: IconBrandLinkedin,
    email: IconMail,
  };
  const IconComponent = icons[icon as keyof typeof icons] ?? IconSchool;
  return (
    <div className="flex bg-primary/10 text-start rounded-xl p-4 border border-primary/20 gap-3 text-sm">
      <div className="flex">
        <IconComponent className="text-primary m-auto" size={24} />
      </div>
      <div className="flex flex-col flex-1 gap-1 line-clamp-1 text-ellipsis">
        <span className="font-semibold text-xs text-gray-400">{title}</span>
        <a className="text-xs btn p-0" href={link} target="_blank">
          {linkLabel}
        </a>
      </div>
    </div>
  );
}

export default ContactCard;
