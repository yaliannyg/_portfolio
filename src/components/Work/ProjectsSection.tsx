import { use } from "react";
import { projectsPromise } from "@/lib/queries";
import ProjectCard from "./ProjectCard";

function ProjectsSection() {
  const projects = use(projectsPromise);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-5 w-full m-auto h-fit">
      {projects.map(
        ({
          key,
          title,
          description,
          images,
          coverImage,
          technologies,
          subtitle,
        }) => (
          <div key={key}>
            <ProjectCard
              coverImage={coverImage}
              description={description}
              images={images}
              title={title}
              subtitle={subtitle}
              technologies={technologies}
            />
          </div>
        ),
      )}
    </div>
  );
}

export default ProjectsSection;
