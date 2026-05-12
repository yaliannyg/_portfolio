import type { Contact } from "@/lib/data";
import { IconBrandLinkedinFilled, IconMailFilled } from "@tabler/icons-react";

function ContactCard({ link, linkLabel, icon, title }: Contact) {
  const icons = {
    linkedIn: IconBrandLinkedinFilled,
    email: IconMailFilled,
  };
  const IconComponent = icons[icon as keyof typeof icons] ?? IconMailFilled;
  return (
    <div className="flex bg-muted/30 text-start rounded-xl p-4 border border-border gap-3 text-sm">
      <div className="flex">
        <IconComponent className="text-on-muted m-auto" size={24} />
      </div>
      <div className="flex flex-col flex-1 gap-1 line-clamp-1 text-ellipsis">
        <span className="font-semibold text-xs text-on-surface/50">{title}</span>
        <a className="text-xs btn p-0" href={link} target="_blank">
          {linkLabel}
        </a>
      </div>
    </div>
  );
}

export default ContactCard;
