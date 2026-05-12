import type { MeDetails } from "@/lib/data";
import {
  IconMessage2Filled,
  IconSchoolFilled,
  IconDeviceDesktopFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
} from "@tabler/icons-react";
function SmallCard({ description, icon, title }: MeDetails) {
  const icons = {
    graduation: IconSchoolFilled,
    dictionary: IconMessage2Filled,
    computer: IconDeviceDesktopFilled,
    linkedIn: IconBrandLinkedinFilled,
    email: IconMailFilled,
  };
  const IconComponent = icons[icon as keyof typeof icons] ?? IconSchoolFilled;
  return (
    <div className="flex bg-muted/30 rounded-xl items-center p-4 border-border border capitalize gap-3 text-sm">
      <div className="p-2 rounded-xl border border-border">
        <IconComponent className="text-on-muted" size={16} />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <span className="font-semibold text-xs text-on-muted">{title}</span>
        <span className="text-xs whitespace-break-spaces">{description}</span>
      </div>
    </div>
  );
}

export default SmallCard;
