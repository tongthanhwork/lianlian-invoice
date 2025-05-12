"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { AuthLayout } from "@/app/components";
import { toast } from "@/components/ui/use-toast";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import styles from "./styles.module.scss";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      footerConfig={{
        description: "Already have an account?",
        link: "/login",
        linkText: "Sign in",
      }}
    >
      <form className={styles.register} onSubmit={handleSubmit}>
        <FormInput
          name="name"
          type="text"
          required
          placeholder="Please enter your fullname"
          label="Fullname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormInput
          name="email"
          type="email"
          required
          label="Email address"
          placeholder="Please enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          name="password"
          type="password"
          required
          label="Password"
          placeholder="Please enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-start mt-2 mb-2">
          {/* <input id="terms" type="checkbox" required className="mt-1 mr-2"  /> */}
          <Checkbox id="terms" type="checkbox" required className="mt-1 mr-2" />
          <label htmlFor="terms" className="text-sm text-gray-700 select-none ">
            I have read and agree to the
            <a
              href="https://vn.lianlianglobal.com/legal/terms"
              className="ml-2 text-blue-700 hover:underline"
            >
              Terms & Conditions
            </a>
            ,{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Privacy Policy.
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Sign up
        </button>
      </form>
    </AuthLayout>
  );
}
