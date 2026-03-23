import Carousel from "./Carousel";

interface ModalProjectProps {
  description: string;
  images: string[];
  technologies: string[];
}
function ModalProject({
  description,
  images,
  technologies,
}: ModalProjectProps) {
  return (
    <div className="flex flex-col">
      <p className="text-gray-400 text-xs mb-3.5">{description}</p>

      <div className="flex gap-3 mb-3">
        {technologies.map((tech) => (
          <div className="text-[8px] px-2 py-0.5 bg-primary/30 rounded-sm text-gray-400">
            <span>{tech}</span>
          </div>
        ))}
      </div>
      <Carousel images={images} />
    </div>
  );
}

export default ModalProject;
