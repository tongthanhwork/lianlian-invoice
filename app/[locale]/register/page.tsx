"use client";

import { AuthLayout } from "@/app/components";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.scss";

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
        <div className={styles.terms}>
          <Checkbox id="terms" required className={styles.checkbox} />
          <label htmlFor="terms" className={styles.label}>
            I have read and agree to the
            <a
              href="https://vn.lianlianglobal.com/legal/terms"
              className={styles.link}
            >
              Terms & Conditions
            </a>
            ,{" "}
            <a href="#" className={styles.link}>
              Privacy Policy.
            </a>
          </label>
        </div>

        <button type="submit" className={styles.button}>
          Sign up
        </button>
      </form>
    </AuthLayout>
  );
}
