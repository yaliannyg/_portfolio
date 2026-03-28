import type { MeDetails } from "@/lib/notion";
import {
  IconMessage2,
  IconSchool,
  IconDeviceDesktop,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
function SmallCard({ description, icon, title }: MeDetails) {
  const icons = {
    graduation: IconSchool,
    dictionary: IconMessage2,
    computer: IconDeviceDesktop,
    linkedIn: IconBrandLinkedin,
    email: IconMail,
  };
  const IconComponent = icons[icon as keyof typeof icons] ?? IconSchool;
  return (
    <div className="flex bg-primary/10 rounded-xl items-center p-4 border border-primary/20 capitalize gap-3 text-sm">
      <div className=" bg-slate-800 p-2 rounded-xl border border-slate-900">
        <IconComponent className="text-primary" size={16} />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <span className="font-semibold text-xs text-gray-400">{title}</span>
        <span className="text-xs whitespace-break-spaces">{description}</span>
      </div>
    </div>
  );
}

export default SmallCard;
