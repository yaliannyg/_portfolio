interface IProps {
  title?: string;
  description?: string;
}
function SectionsTitle({ title, description }: IProps) {
  return (
    <div className="flex flex-col capitalize">
      {description && (
        <h6 className="text-primary text-xs tracking-widest uppercase mb-1.5">
          {description}
        </h6>
      )}
      {title && <h5 className="text-white text-xl mt-1.5 mb-6"> {title} </h5>}
    </div>
  );
}

export default SectionsTitle;
