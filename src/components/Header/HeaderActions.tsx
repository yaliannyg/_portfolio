import CVDocument from "@/assets/documents/YALIANNY  GONZALEZ.pdf";
import { LetsTalkBtn } from "@/App";

function HeaderActions() {
  return (
    <div className="flex gap-5 mt-10">
      <a className="btn" href={CVDocument} download>
        Download CV
      </a>
      <LetsTalkBtn />
    </div>
  );
}

export default HeaderActions;
