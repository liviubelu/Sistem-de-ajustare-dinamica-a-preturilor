'use client';

import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCart } from '../components/CartContext';  // importă contextul coșului
import Footer from '../components/footer';

export default function PhotoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [sizes, setSizes] = useState<{ SizeValue: number; Stock: number }[]>([]);
  const [similarTypes, setSimilarTypes] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    const foundProduct = data.find((item: any) => item.id.toString() === id);
    console.log('Produs găsit:', foundProduct);  // Debug: verifică să existe sneakerId
    setProduct(foundProduct);
  });

    fetch(`/api/size?typeId=${id}`)
      .then(res => res.json())
      .then(data => setSizes(data));
  }, [id]);

  useEffect(() => {
    if (!product?.sneakerId) return;

    fetch(`/api/similar-types?sneakerId=${product.sneakerId}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((t: any) => t.TypeID.toString() !== id);
        setSimilarTypes(filtered);
      });
  }, [product, id]);

  if (!product) return <p className="text-center mt-10">Se încarcă...</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (status !== 'authenticated') {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    setSizeError(false);
    
    console.log('SneakerID:', product.sneakerId);

    addToCart({
      id: product.id,
      sneakerId: product.sneakerId,
      brand: product.brand,
      name: product.name,
      price: Number(product.pret),
      image: product.src,
      quantity: 1,
      size: selectedSize,
    });

    alert('Produs adăugat în coș!');
  };

  const handleLoginRedirect = () => {
    router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
  };

  return (
    <main className="theme-light">
      <div className="sticky top-0 z-50">
        <Menu />
      </div>

      <div className="hero min-h-screen bg-[rgb(196,196,196)]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black">{product.brand} {product.name}</h1>
            <p className="py-6 text-black text-4xl">{product.pret} RON</p>

            <div className="join border-primary">
              {sizes.map(({ SizeValue, Stock }) => (
                <input
                  key={SizeValue}
                  className={`join-item btn ${selectedSize === SizeValue ? 'btn-primary' : ''}`}
                  type="radio"
                  name="options"
                  aria-label={SizeValue.toString()}
                  disabled={Stock <= 0}
                  onChange={() => {
                    setSelectedSize(SizeValue);
                    setSizeError(false);
                  }}
                  checked={selectedSize === SizeValue}
                />
              ))}
            </div>

            {sizeError && <p className="text-red-600 mt-2">Te rog alege o mărime înainte de a adăuga în coș.</p>}

            <div className="flex items-center mt-2 mb-2">
              <div className="h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 flex-grow" />
            </div>

            <button
              className="btn btn-wide bg-primary btn-primary text-white"
              onClick={handleAddToCart}
            >
              Adaugă în coș
            </button>

            {showAlert && (
              <div
                role="alert"
                className="alert alert-vertical sm:alert-horizontal mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Trebuie să fii logat pentru a cumpăra!</span>
                <div>
                  <button
                    onClick={handleLoginRedirect}
                    className="btn btn-sm btn-primary"
                    autoFocus
                  >
                    Autentifică-te
                  </button>
                </div>
              </div>
            )}

            {/* Variante similare */}
            {similarTypes.length > 0 && (
              <div className="mt-10 text-center text-black">
                <h2 className="text-2xl font-semibold mb-4">Variante similare</h2>
                <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
                  {similarTypes.map(({ TypeID, TypeName, Image1 }) => (
                    <Link
                      key={TypeID}
                      href={`/${TypeID}`}
                      className="w-32 cursor-pointer block"
                    >
                      <Image
                        src={Image1}
                        alt={TypeName}
                        width={128}
                        height={128}
                        className="rounded-lg object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 rounded-2xl">
            <div className="carousel">
              {[product.src, product.src2, product.src3, product.src4].map((src, i) => (
                <div
                  key={i}
                  id={`slide${i + 1}`}
                  className="carousel-item relative w-full"
                >
                  <Image
                    src={src}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="rounded-2xl object-cover"
                  />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
                    <a href={`#slide${i === 0 ? 4 : i}`} className="btn btn-circle">❮</a>
                    <a href={`#slide${(i + 2) > 4 ? 1 : i + 2}`} className="btn btn-circle">❯</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
