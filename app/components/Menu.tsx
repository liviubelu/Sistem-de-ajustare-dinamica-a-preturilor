'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from './CartContext';

export default function Menu() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartItems, totalPrice, removeFromCart, clearCart } = useCart();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <nav className="relative bg-base-100 shadow-md px-4 py-2 flex items-center justify-between">
      {/* Meniul burger - partea stanga */}
      <div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link href="/">Acasa</Link></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Logo fix centrat */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ pointerEvents: 'none' }} // previne blocarea click-urilor din stanga/dreapta
      >
        <Link href="/" className="btn btn-ghost text-3xl normal-case pointer-events-auto">
          SneakerSale
        </Link>
      </div>

      {/* Partea dreapta: cos si cont */}
      <div className="flex items-center gap-4">
        {/* Coșul de cumpărături */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Coș ({cartItems.length})
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-4 shadow-sm"
          >
            {cartItems.length === 0 ? (
              <li className="px-4 py-2">Coșul este gol.</li>
            ) : (
              <>
                {cartItems.map(item => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center gap-2 px-4 py-2"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>Size: {item.size}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p>{(item.price * item.quantity).toFixed(2)} RON</p>
                      <button
                        className="btn btn-xs btn-error mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Șterge
                      </button>
                    </div>
                  </li>
                ))}
                <li className="px-4 py-2 font-bold border-t mt-2">
                  Total: {totalPrice.toFixed(2)} RON
                </li>
                <li className="px-4 py-2">
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => router.push('/cart')}
                  >
                    Finalizează comanda
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Autentificare/Cont */}
        {session ? (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-primary normal-case text-base"
              type="button"
            >
              Bine ai venit, {session.user.firstName || session.user.email}
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><a>Detalii cont</a></li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/signin" className="btn btn-primary">
            Conecteaza-te
          </Link>
        )}
      </div>
    </nav>
  );
}
