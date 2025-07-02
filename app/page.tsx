'use client';

import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import Card from './components/card';
import Parteneri from './components/parteneri';
import Four_card from './components/four_card';
import Footer from './components/footer';

type Product = {
  id: number;
  brand: string;
  name: string;
  color: string;
  pret: string;
  src: string;
  src2: string;
  src3: string;
  src4: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Eroare la preluarea produselor:', error));
  }, []);

  return (
    <main className="theme-light">
      <div className="sticky top-0 z-50">
        <Menu />
      </div>

      <Four_card />

      <Parteneri />

      {/* PRODUSE */}
      <div className="flex flex-wrap justify-center gap-10 mt-10 px-4">
        {products.map(({ id, brand, name, src, pret }) => (
          <Card key={id} brand={brand} poza={src} nume={name} pret={pret} id={id.toString()} />
        ))}
      </div>
      <div className="mt-10"><Footer /> </div>
    </main>
  );
}
