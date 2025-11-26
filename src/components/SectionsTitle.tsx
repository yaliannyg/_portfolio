interface IProps {
  title: string;
  subtitle?: string;
}
function SectionsTitle({ title, subtitle }: IProps) {
  return (
    <div className="flex flex-col text-center capitalize">
      <h6 className="text-xl text-white/50">{subtitle}</h6>
      <h5 className="text-primary text-3xl"> {title} </h5>
    </div>
  );
}

export default SectionsTitle;
