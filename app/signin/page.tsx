'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Verificare locală pentru admin
    if (email === 'admin@admin' && password === 'admin') {
      router.push('/admin');
      return;
    }

    // 🔄 Altfel, continuă cu autentificarea normală
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      setError('');
      router.push(callbackUrl);
    }
  };

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-center">
            <h1 className="text-5xl font-bold">Intră în cont!</h1>
            <p className="py-6">
              Pentru a putea utiliza FootShop trebuie să fii logat. Dacă nu ai cont, creează unul{' '}
              <Link href="/signup" className="text-blue-600 underline">
                aici
              </Link>
              .
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  <input
                    type="checkbox"
                    defaultChecked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="checkbox-sm checkbox-primary ml-10"
                  />
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Intră în cont</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
