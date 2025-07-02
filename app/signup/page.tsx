"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    setSuccess('');
    return;
  }

  if (typeof age !== 'number' || age < 14) {
    setError('You must be at least 14 years old');
    setSuccess('');
    return;
  }

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, age }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('Account created successfully!');
      setError('');
      setTimeout(() => router.push('/signin'), 2000);
    } else {
      setError(data.message || 'Eroare la creare cont');
      setSuccess('');
    }
  } catch (error) {
    setError('Server error');
    setSuccess('');
  }
};


  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-center">
            <h1 className="text-5xl font-bold">Creează-ți un cont!</h1>
            <p className="py-6">
              Pentru a putea utiliza FootShop trebuie să-ți creezi un cont.
            </p>
            <p className="mb-6">
              Dacă ai deja cont, poți să te autentifici{' '}
              <Link href="/signin" className="text-blue-600 underline">
                aici
              </Link>
              .
            </p>
          </div>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="Age"
                  className="input input-bordered"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min={14}
                  required
                />
              </div>

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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                  <input
                    type="checkbox"
                    defaultChecked={showConfirmPassword}
                    onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="checkbox-sm checkbox-primary ml-10"
                  />
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm password"
                    className="input input-bordered"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <div className="form-control mt-6">
                <button className="btn btn-primary">Creare cont</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
