import Image from "next/image";
import Menu from '../components/Menu'
import productsImages, { ProductImage } from "../product";
import Divider from "../components/divider"
import Carousel from "../components/carusel"

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: ProductImage = productsImages.find((p) => p.id === id)!;
  const images = [
    { src: photo.src, alt: photo.name },
    { src: photo.src2, alt: photo.name },
    { src: photo.src3, alt: photo.name },
    { src: photo.src4, alt: photo.name },
  ];
  return (
    <main className="theme-light">
    <div className='sticky top-0 z-50'><Menu /></div>
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">{photo.name}</h1>
      <p className="py-6">{photo.descriere}</p>
      <div className="join  border-primary">
        <input className="join-item btn" type="radio" name="options" aria-label="38" />
        <input className="join-item btn" type="radio" name="options" aria-label="39" />
        <input className="join-item btn" type="radio" name="options" aria-label="40" />
        <input className="join-item btn" type="radio" name="options" aria-label="41" />
        <input className="join-item btn" type="radio" name="options" aria-label="42" />
        <input className="join-item btn" type="radio" name="options" aria-label="43" />
        <input className="join-item btn" type="radio" name="options" aria-label="44" />
      </div>
      <div className="flex items-center mt-2 mb-2">
        <div className="h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 flex-grow"></div>
      </div>
      <div>
        <button className="btn btn-wide bg-primary btn-primary text-white">Adauga in cos</button>
      </div>
    </div>
     
    <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 rounded-2xl">
        <div className="carousel">
            <div id="slide1" className="carousel-item relative w-full">
                <Image alt={photo.name}
                    src={photo.src} className="rounded-2xl">
                </Image>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a> 
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <Image alt={photo.name}
                    src={photo.src2} className="rounded-2xl">
                </Image>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a> 
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <Image alt={photo.name}
                    src={photo.src3} className="rounded-2xl">
                </Image>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a> 
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <Image alt={photo.name}
                    src={photo.src4} className="rounded-2xl">
                </Image>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a> 
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div> 
        <form className="card-body">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Adidas Campus 00S Green</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-green-500" checked />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Adidas Campus 00S Black</span> 
              <input type="radio" name="radio-10" className="radio checked:bg-white" checked />
            </label>
          </div>
      </form>
    </div>
  </div>
</div>
    </main>
  );
}
