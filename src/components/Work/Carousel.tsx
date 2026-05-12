import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/utils";

interface CarouselProps {
  projectName: string;
  images: string[];
}
function Carousel({ images, projectName }: CarouselProps) {
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
      className="flex rounded-xl flex-col w-full bg-muted/20 relative"
    >
      <div className="absolute text-[10px] bg-muted top-2 right-3 rounded-2xl px-2 text-on-muted">
        <span>{currentImgIndex + 1}</span> {" / "} <span>{images.length}</span>
      </div>
      <div className="rounded-xl h-auto ">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Project ${projectName} - Image #${i}`}
            className={`rounded-t-xl object-fill object-center size-full ${
              i === currentImgIndex ? "block" : "hidden"
            }`}
          />
        ))}
      </div>

      <div className="h-12 w-full flex justify-center items-center px-2">
        <button
          className="rounded-xl size-8 px-2 flex justify-center items-center bg-muted disabled:text-on-muted/30 text-on-muted"
          onClick={handlePrevious}
          disabled={currentImgIndex === 0}
        >
          <IconChevronLeft />
        </button>

        <div className="flex gap-2 p-2">
          {images.map((image, index) => (
            <div
              key={image}
              className={cn(
                "bg-muted p-1 rounded-full",
                index === currentImgIndex ? "px-2" : "",
              )}
            ></div>
          ))}
        </div>
        <button
          className="rounded-xl size-8 px-2 flex justify-center items-center bg-muted disabled:text-on-muted/30 text-on-muted"
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
