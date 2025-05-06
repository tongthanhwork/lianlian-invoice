'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            router.push('/');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 !text-gray-900">

                <h2 className="text-3xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500">
                    Join Invoify
                </h2>

                <p className="text-center text-sm text-gray-700 mb-6">
                    Start managing your invoices with ease. Get access to professional templates, automated calculations, and real-time tracking.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm" role="alert">
                            {error}
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            required
                            placeholder="Full name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 !bg-white !text-gray-900"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            required
                            placeholder="Email address"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 !bg-white !text-gray-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none !bg-white !text-gray-900"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                    >
                        Sign up
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-indigo-600 hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>)
} 