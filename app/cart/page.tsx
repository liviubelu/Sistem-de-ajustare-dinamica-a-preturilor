'use client';

import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { data: session, status } = useSession();
  const { cartItems, totalPrice, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Date livrare
  const [firstName, setFirstName] = useState(session?.user?.firstName || '');
  const [lastName, setLastName] = useState(session?.user?.lastName || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [county, setCounty] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Trebuie să fii logat pentru a vedea coșul.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Coșul este gol!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderItems = cartItems.map(item => ({
        typeId: item.id,
        sneakerId: item.sneakerId,
        size: item.size,
        quantity: item.quantity,
      }));

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Eroare la procesarea comenzii.');
        setLoading(false);
        return;
      }

      alert('Comanda a fost trimisă! Mulțumim!');
      clearCart();
      router.push('/'); // Redirect către homepage sau altă pagină după comanda
    } catch (err) {
      setError('Eroare la trimiterea comenzii.');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-screen mx-auto bg-base-200 shadow-md max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Coșul tău de cumpărături</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {cartItems.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md mb-8">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Produsele tale</li>
          {cartItems.map((item, index) => (
            <li
              key={`${item.id}-${item.size}`}
              className="list-row flex justify-between items-center px-4 py-2"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-thin opacity-50 tabular-nums">{String(index + 1).padStart(2, '0')}</div>
                <img src={item.image} alt={item.name} className="size-10 rounded-box" />
                <div className="list-col-grow">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs uppercase opacity-60">
                    Marime: {item.size} | Cantitate: {item.quantity}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div>{(item.price * item.quantity).toFixed(2)} RON</div>
                <button
                  className="btn btn-xs btn-error mt-1"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  Șterge
                </button>
              </div>
            </li>
          ))}
          <li className="px-4 py-2 font-bold border-t mt-2 text-right">
            Total: {totalPrice.toFixed(2)} RON
          </li>
        </ul>
      )}

      <h2 className="text-3xl font-semibold mb-4 text-center">Date pentru livrare</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="label">
            <span className="label-text">Prenume</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Nume</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Număr de telefon</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Ex: 07xx xxx xxx"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Metoda de plată</span>
          </label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Adresa de livrare</h3>
        <div>
          <label className="label">
            <span className="label-text">Județ</span>
          </label>
          <input
            type="text"
            value={county}
            onChange={e => setCounty(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Oraș</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Stradă</span>
          </label>
          <input
            type="text"
            value={street}
            onChange={e => setStreet(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Număr</span>
          </label>
          <input
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
          {loading ? 'Se procesează...' : 'Plasează comanda'}
        </button>
      </form>
    </div>
  );
}
