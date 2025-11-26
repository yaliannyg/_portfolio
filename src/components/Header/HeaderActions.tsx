import { LetsTalkBtn } from "@/App";

function HeaderActions() {
  return (
    <div className="flex gap-5 mt-10">
      <a
        className="btn"
        href="https://drive.google.com/file/d/15hWtwq-Hl11xu8ASCVWs4yCK4t5nd8x4/view?usp=sharing"
        target="_blank"
      >
        Download CV
      </a>
      <LetsTalkBtn />
    </div>
  );
}

export default HeaderActions;
