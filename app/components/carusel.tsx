import Image from "next/image";
import { useState } from 'react';
import wondersImages, { ProductImage } from "../product";
import productsImages from "../product";

const Carousel = ({ images }: { images: ProductImage[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <div className="carousel relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item absolute w-full ${index === currentSlide ? '' : 'hidden'}`}
        >
          <Image
            alt="poza"
            src={image.src}
            className="rounded-2xl"
            width={800}
            height={600}
          />
        </div>
      ))}
      <div className="absolute flex justify-between left-1/2 transform -translate-x-1/2 bottom-2">
        <button onClick={prevSlide} className="btn btn-circle">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
