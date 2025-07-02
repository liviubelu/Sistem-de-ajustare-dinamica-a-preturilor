import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
  nume: string;
  brand: string;
  pret: string;
  poza: StaticImageData | string;
  id: string;
}

const Card: React.FC<CardProps> = ({ nume, brand, pret, poza, id }) => {
  return (
    <div className="card card-side w-1/5 bg-base-100 shadow-xl glass">
      <div className="rounded w-3/5">
        <figure>
          {typeof poza === 'string' ? (
            <img src={poza} alt="Shoes" className="rounded-2xl w-full h-auto object-cover" />
          ) : (
            <Image src={poza} alt="Shoes" className="rounded-2xl" width={300} height={300} />
          )}
        </figure>
      </div>
      <div className="card-body w-2/5 flex flex-col justify-center items-center">
  <div>
    <p className="card-title text-center font-3xl">{brand}</p>
  </div>
  <div>
    <p className="card-title text-center font-3xl">{nume}</p>
  </div>
  <div>
    <p className="alig-text-bottom">{pret}</p>
  </div>
  <div>
    <Link href={`/${id}`} passHref className="h-10 w-32 flex justify-center bg-primary rounded-md text-2xl">Cumpără</Link>
  </div>
</div>

    </div>
  );
};

export default Card;
