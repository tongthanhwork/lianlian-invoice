'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            // router.push('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>
                    Welcome to Invoify
                </h2>
                <div className={styles.description}>
                    <p className={styles.descriptionText}>
                        Streamline your invoicing process with our powerful and intuitive platform.
                        Create, manage, and track invoices effortlessly.
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
                        Sign in
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className={styles.link}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 