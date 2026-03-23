import { getProjects, type ProjectItem } from "@/lib/notion";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      const _projects = await getProjects();

      setProjects(_projects);
    };
    fetchData();
  }, []);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-5 w-full m-auto h-fit">
      <>
        {projects
          ? projects.map(
              ({
                key,
                title,
                description,
                images,
                coverImage,
                technologies,
              }) => (
                <ProjectCard
                  key={key}
                  coverImage={coverImage}
                  description={description}
                  images={images}
                  title={title}
                  technologies={technologies}
                />
              ),
            )
          : [...new Array(5)].map(() => <ProjectCardSkeleton />)}
      </>
    </div>
  );
}

export default ProjectsSection;
