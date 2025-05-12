"use client";

import { AuthLayout } from "@/app/components";
import FormInput from "@/app/components/reusables/form-fields/FormInput/FormInput";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Invalid email or password",
      });
    }
  };

  return (
    <AuthLayout title="Login your account">
      <form className={styles.login} onSubmit={handleSubmit}>
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

        {/* <div className="flex items-start mt-2 mb-2">
          <input id="terms" type="checkbox" required className="mt-1 mr-2" />
          <label htmlFor="terms" className="text-sm text-gray-700 select-none">
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
        </div> */}

        <button type="submit" className={styles.submitBtn}>
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}
