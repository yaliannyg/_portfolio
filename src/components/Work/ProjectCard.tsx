import { useState } from "react";
import Modal from "../Modal";
import { type ProjectItem } from "@/lib/data";
import ModalProject from "./ModalProject";
import { useCTALabels } from "@/context/CtaContext";
import { usePostHog } from "@posthog/react";

type ProjectCardProps = Omit<ProjectItem, "key" | "id" | "order">;
function ProjectCard({
  images,
  coverImage,
  description,
  technologies,
  title,
  subtitle,
}: ProjectCardProps) {
  const labels = useCTALabels();
  const posthog = usePostHog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  function seeMore() {
    posthog?.capture("project_viewed", { project_title: title, project_subtitle: subtitle });
    setIsModalOpen(true);
  }

  return (
    <div className="flex flex-col w-full max-w-64  bg-muted/30 border border-border rounded-xl m-auto h-full">
      <div id="image" className="w-full h-28">
        <img
          className="rounded-t-xl h-full object-cover object-center w-full"
          src={coverImage}
          alt={`Cover image for ${title}`}
        />
      </div>
      <div className="px-3.5 py-4 flex-1 flex flex-col">
        <div id="content" className="flex flex-col ">
          <p className="text-[10px] text-on-surface/50 uppercase">{subtitle}</p>
          <p className="text-on-muted font-semibold text-sm mb-1.5">{title}</p>

          <p className="text-xs mb-3">{description}</p>

          <div className="flex gap-3 mb-3 flex-wrap">
            {technologies.map((tech) => (
              <div
                className="text-[8px] px-2 py-0.5 bg-muted/70 rounded-sm"
                key={tech}
              >
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
        <div id="actions" className="mt-auto">
          <button
            className="btn rounded-lg w-full capitalize text-xs text-on-muted leading-none bg-surface border border-border"
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
          projectName={title}
          images={images}
          description={description}
          technologies={technologies}
        />
      </Modal>
    </div>
  );
}

export default ProjectCard;
