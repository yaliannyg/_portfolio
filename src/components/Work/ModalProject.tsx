import Carousel from "./Carousel";

interface ModalProjectProps {
  projectName: string;
  description: string;
  images: string[];
  technologies: string[];
}
function ModalProject({
  projectName,
  description,
  images,
  technologies,
}: ModalProjectProps) {
  return (
    <div className="flex flex-col">
      <p className="text-xs mb-3.5">{description}</p>

      <div className="flex gap-3 mb-3">
        {technologies.map((tech) => (
          <div
            className="text-[8px] px-2 py-0.5 bg-muted rounded-sm"
            key={tech}
          >
            <span>{tech}</span>
          </div>
        ))}
      </div>
      <Carousel images={images} projectName={projectName} />
    </div>
  );
}

export default ModalProject;
