import { type IDetail } from "@/App";
import {
  EmailIcon,
  LinkedInIcon,
  ComputerIcon,
  DictionaryIcon,
  GraduationIcon,
} from "@/assets/icons/index";

type IProps = Omit<IDetail, "index">;

function SmallCard({ description, icon, title }: IProps) {
  const icons = {
    graduation: GraduationIcon,
    dictionary: DictionaryIcon,
    computer: ComputerIcon,
    linkedIn: LinkedInIcon,
    email: EmailIcon,
  };
  const IconComponent = icons[icon as keyof typeof icons] ?? GraduationIcon;
  return (
    <div className="flex flex-col bg-variant rounded-3xl items-center p-4 text-center capitalize gap-3">
      <IconComponent className="text-primary" size={28} />
      <span className="text-lg font-semibold ">{title}</span>
      <div>
        {description.map((info: string) => (
          <div
            dangerouslySetInnerHTML={{ __html: info }}
            key={info}
            className="text-sm text-white/80 font-light"
          />
        ))}
      </div>
    </div>
  );
}

export default SmallCard;
