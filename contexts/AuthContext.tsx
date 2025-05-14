"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types";
import { authService } from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import { spinnerService } from "@/services/spinner.service";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  console.log("🚀 ~ AuthProvider ~ user:", user);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        spinnerService.startSpinner();
        const userData = await authService.getProfile();
        console.log("🚀 ~ checkAuth ~ userData:", userData);
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        spinnerService.endSpinner();
      }
    };

    checkAuth();
  }, []);

  const withSpinner = async <T,>(fn: () => Promise<T>): Promise<T> => {
    spinnerService.startSpinner();
    try {
      return await fn();
    } finally {
      spinnerService.endSpinner();
    }
  };

  const login = async (email: string, password: string) => {
    return withSpinner(async () => {
      try {
        const userData = await authService.login({ email, password });
        console.log("🚀 ~ returnwithSpinner ~ userData?.user:", userData);
        setUser(userData);
        router.push("/invoice");
        router.refresh();
        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: "Login failed" };
      }
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return withSpinner(async () => {
      try {
        const userData = await authService.register({ name, email, password });
        setUser(userData);
        router.push("/dashboard");
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    });
  };

  const logout = async () => {
    return withSpinner(async () => {
      try {
        await authService.logout();
        setUser(null);
        router.push("/login");
        router.refresh();
        window.location.href = "/login"; // Force a full page reload
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    return withSpinner(async () => {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
