import Image from "next/image";
import { useState } from 'react';
import { ProductImage } from "../product";

const Carousel = ({ images }: { images: ProductImage[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <div className="carousel relative w-full h-[600px] rounded-2xl overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority
          />
        </div>
      ))}

      {/* Butoane pe margini, centrate vertical */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 btn btn-circle bg-black/50 hover:bg-black/70 text-white"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 btn btn-circle bg-black/50 hover:bg-black/70 text-white"
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
