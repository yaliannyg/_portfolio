import { useState } from "react";

interface IProps {
  images: string[];
}

function Carrusel({ images }: IProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex-1 flex flex-col  justify-center items-center relative">
      <div className="py-5 px-5 flex justify-between items-center">
        <div className="flex-1 px-5">
          <img
            src={images[current]}
            alt=""
            className=" shadow-2xl p-5 rounded-xl"
          />
        </div>
      </div>
      <div className=" ">
        <ul className="flex  gap-1.5">
          {images.map((image, index) => (
            <button
              className={`cursor-pointer ${
                index === current
                  ? "border-primary border-2 shadow-2xl rounded-xl"
                  : "opacity-80"
              }`}
              onClick={() => setCurrent(index)}
            >
              <li key={index}>
                <img src={image} alt="" className="size-14 rounded-lg" />
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Carrusel;
