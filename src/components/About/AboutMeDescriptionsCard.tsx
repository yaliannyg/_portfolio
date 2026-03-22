import {
  EmailIcon,
  LinkedInIcon,
  ComputerIcon,
  DictionaryIcon,
  GraduationIcon,
} from "@/assets/icons/index";
import type { MeDetails } from "@/lib/notion";

function SmallCard({ description, icon, title }: MeDetails) {
  const icons = {
    graduation: GraduationIcon,
    dictionary: DictionaryIcon,
    computer: ComputerIcon,
    linkedIn: LinkedInIcon,
    email: EmailIcon,
  };
  const IconComponent = icons[icon as keyof typeof icons] ?? GraduationIcon;
  return (
    <div className="flex bg-primary/10 rounded-xl items-center p-4 border border-primary/20 capitalize gap-3 text-sm">
      <div className=" bg-slate-800 p-4 rounded-xl border border-slate-900">
        <IconComponent className="text-primary" size={16} />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <span className="font-semibold text-xs text-gray-400">{title}</span>
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
}

export default SmallCard;
