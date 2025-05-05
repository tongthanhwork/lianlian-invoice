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
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>
                    Join Invoify
                </h2>
                <div className={styles.description}>
                    <p className={styles.descriptionText}>
                        Start managing your invoices with ease. Get access to professional
                        templates, automated calculations, and real-time tracking.
                    </p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && (
                        <div className={styles.error} role="alert">
                            {error}
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            required
                            className={styles.input}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Sign up
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className={styles.link}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 