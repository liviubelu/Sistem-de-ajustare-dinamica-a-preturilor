"use client";

import Menu from './components/Menu';
import Carusel from './components/carusel';
import Card from './components/card';
import Divider from './components/divider';
import Link from 'next/link';
import Button from './components/button';
import product from './product';
import Image from "next/image";

export default function Home() {
  return (
    <main className="theme-light">
      <div className='sticky top-0 z-50'><Menu /></div>
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="flex">
            <div className="w-1/3 bg-base-100 flex items-center pl-4">
              <p className="text-white text-3xl">Colaborăm cu branduri de top precum:</p>
            </div>
            <div className='w-2/3 bg-white flex'>
              <div className="w-1/4 mx-1">
                <img src="/images/pngwing.com (7).png" className='object-cover h-32' />
              </div>
              <div className="w-1/4 mx-1">
                <img src="/images/pngwing.com (5).png" className='object-cover h-32' />
              </div>
              <div className="w-1/4 mx-1">
                <img src="/images/pngwing.com (3).png" className='object-cover h-32' />
              </div>
              <div className="w-1/4 mx-1">
                <img src="/images/pngwing.com (4).png" className='object-cover h-32' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center space-x-10 mt-5">
          {product.map(({ id, name, src, pret, descriere }) => (
            <Card key={id} poza={src} nume={name} pret={pret} descriere={descriere} id={id} />
          ))}
        </div>
        <Divider />
        <div className="flex justify-center items-center space-x-10 mt-5">
          {product.map(({ id, name, src, pret, descriere }) => (
            <Card key={id} poza={src} nume={name} pret={pret} descriere={descriere} id={id} />
          ))}
        </div>
        <Divider />
        <div className="flex justify-center items-center space-x-10 mt-5">
          {product.map(({ id, name, src, pret, descriere }) => (
            <Card key={id} poza={src} nume={name} pret={pret} descriere={descriere} id={id} />
          ))}
        </div>
        <Divider />
      </div>
    </main>
  );
}
