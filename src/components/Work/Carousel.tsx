import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/utils";

interface CarouselProps {
  images: string[];
}
function Carousel({ images }: CarouselProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

  const handlePrevious = () => {
    if (currentImgIndex > 0) setCurrentImgIndex(currentImgIndex - 1);
  };

  const handleNext = () => {
    if (currentImgIndex < images.length - 1)
      setCurrentImgIndex(currentImgIndex + 1);
  };

  return (
    <div
      id="carousel"
      className="flex rounded-xl flex-col w-full bg-slate-700 relative"
    >
      <div className="absolute text-[10px] bg-slate-700 top-2 right-3 rounded-2xl px-2 text-gray-400">
        <span>{currentImgIndex + 1}</span> {" / "} <span>{images.length}</span>
      </div>
      <div className="rounded-xl h-56 ">
        <img
          src={images[currentImgIndex]}
          alt=""
          className="rounded-t-xl object-cover object-center size-full"
        />
      </div>

      <div className="h-12 w-full flex justify-between items-center px-2">
        <button
          className="rounded-xl size-8 px-2 flex justify-center items-center bg-primary/20 disabled:text-primary/20 text-primary"
          onClick={handlePrevious}
          disabled={currentImgIndex === 0}
        >
          <IconChevronLeft />
        </button>

        <div className="flex gap-2">
          {images.map((image, index) => (
            <div
              key={image}
              className={cn(
                "bg-primary p-1 rounded-full",
                index === currentImgIndex ? "px-2" : "",
              )}
            ></div>
          ))}
        </div>
        <button
          className="rounded-xl size-8 px-2 flex justify-center items-center bg-primary/20 disabled:text-primary/20 text-primary"
          onClick={handleNext}
          disabled={currentImgIndex === images.length - 1}
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
