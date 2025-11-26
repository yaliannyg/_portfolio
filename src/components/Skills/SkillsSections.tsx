import SectionsTitle from "../SectionsTitle";
import SkillsGrid from "@/components/Skills/SkillsGrid";

function SkillsSections() {
  return (
    <div>
      <SectionsTitle
        title="My Experience"
        subtitle="What Skills I Have
"
      />

      <div className="mt-10">
        <SkillsGrid />
      </div>
    </div>
  );
}

export default SkillsSections;
