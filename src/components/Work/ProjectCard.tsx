import { useState } from "react";
import Modal from "../Modal";
import { type ProjectItem } from "@/lib/notion";
import ModalProject from "./ModalProject";
import { useCTALabels } from "@/context/ctaContext";

type ProjectCardProps = Omit<ProjectItem, "key" | "id">;
function ProjectCard({
  images,
  coverImage,
  description,
  technologies,
  title,
  subtitle
}: ProjectCardProps) {
  const labels = useCTALabels();

  const [isModalOpen, setIsModalOpen] = useState(false);
  function seeMore() {
    setIsModalOpen(true);
  }

  return (
    <div className="flex flex-col w-full max-w-64 bg-slate-900 border-variant/70 border rounded-xl m-auto h-full">
      <div id="image" className="w-full h-28">
        <img
          className="rounded-t-xl h-full object-cover object-center w-full"
          src={coverImage}
          alt={`Cover image for ${title}`}
        />
      </div>
      <div className="px-3.5 py-4 flex-1 flex flex-col">
        <div id="content" className="flex flex-col ">
          <p className="text-primary font-semibold text-sm mb-1.5">{title}</p>

          <div className="text-gray-400 text-xs mb-3">{description}</div>

          <div className="flex gap-3 mb-3">
            {technologies.map((tech) => (
              <div className="text-[8px] px-2 py-0.5 bg-primary/30 rounded-sm text-gray-400" key={tech}>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="actions" className="mt-auto">
          <button
            className="btn rounded-lg w-full capitalize text-xs text-primary leading-none bg-primary/10 border border-primary/10"
            onClick={seeMore}
          >
            {labels?.Button.view_project_btn}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        subtitle={subtitle}
      >
        <ModalProject
          images={images}
          description={description}
          technologies={technologies}
        />
      </Modal>
    </div>
  );
}

export default ProjectCard;
