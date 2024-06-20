import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from "next/image";

interface CardProps {
    nume: string;
    pret: string;
    poza: StaticImageData;
    descriere: string;
    id: string;
}

const Card: React.FC<CardProps> = ({ nume, pret, poza, descriere, id }) => {
    return (
        <div className="card card-side w-1/5 bg-base-100 shadow-xl glass">
            <div className="rounded w-3/5">
                <figure>
                    <Image src={poza} alt="Shoes" className="rounded-2xl" />
                </figure>
            </div>
            <div className="card-body w-2/5 flex justify-center items-center">
                <div className="flex justify-center w-full">
                    <p className="card-title text-top font-3xl flex">{nume}</p>
                </div>
                <div>
                    <p className="alig-text-bottom">{pret}</p>
                </div>
                <div>
                    <Link href={`/${id}`} passHref className="h-10 w-32 flex justify-center bg-primary rounded-md text-2xl">Cumpara
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;
