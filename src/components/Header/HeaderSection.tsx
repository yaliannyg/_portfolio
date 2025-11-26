import HeaderActions from "@/components/Header/HeaderActions";

interface IProps {
  name: string;
  position: string;
}
export default function Header({ name, position }: IProps) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center capitalize pt-24 gap-4">
        <span className="text-lg">Hello I'm</span>
        <h1 className="text-4xl font-bold text-white tracking-wider ">
          {name.split("").map((char, index) => (
            <span
              key={index}
              style={{ "--char-index": index } as React.CSSProperties}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <h6 className="text-xl text-white/50">
          <span>{position} </span>
        </h6>
      </div>
      <HeaderActions />
    </div>
  );
}
