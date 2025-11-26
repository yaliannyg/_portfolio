import { useState } from "react";
import Modal from "../Modal";

interface IContent {
  title: string;
  description: string;
  images: string[];
}

export interface IProps {
  img: string;
  content: IContent;
}

function WorkCard({ img, content }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function seeMore() {
    setIsModalOpen(true);
  }

  return (
    <div className="flex flex-col w-full bg-variant rounded-3xl p-4 gap-5">
      <div id="image" className="w-full n h-44">
        <img
          className="rounded-3xl h-full object-cover w-full "
          src={img}
          alt=""
        />
      </div>
      <div id="content" className="flex flex-col capitalize">
        <span className="text-primary font-semibold">{content.title}</span>

        <div
          className="text-sm font-light"
          dangerouslySetInnerHTML={{ __html: content.description }}
        />
      </div>
      <div id="actions" className="mt-auto">
        <button
          className="btn btn-primary w-full mt-6 capitalize"
          onClick={seeMore}
        >
          more
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        data={content.images}
      />
    </div>
  );
}

export default WorkCard;
