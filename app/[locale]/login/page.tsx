"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import styles from "./login.module.css";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      // router.push('/');
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 !text-gray-900">
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500">
          Welcome to Invoify
        </h2>
        <p className="text-center text-sm text-gray-700 mb-6">
          Streamline your invoicing process with our powerful and intuitive
          platform.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          <FormInput
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email address"
            placeholder="Enter your email address"
          />

          <FormInput
            name="password"
            type="password"
            required
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
