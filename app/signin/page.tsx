'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import userAccounts from '../conturi';
import Link from 'next/link';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = userAccounts.find(account => account.email === email && account.password === password);

        if (user) {
            setError('');
            router.push('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-center">
                        <h1 className="text-5xl font-bold">Intra in cont!</h1>
                        <p className="py-6">Pentru a putea utiliza FootShop trebuie sa fi logat. Daca nu ai cont iti poti creea aici:</p>
                        <Link href="/signup">
                        <button className="btn btn-outline btn-primary">Creeaza-ti un cont</button>
                        </Link>
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
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    className="input input-bordered"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Intra in cont</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
