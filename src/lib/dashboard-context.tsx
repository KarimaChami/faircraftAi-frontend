"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";
import { getCurrentUser, logoutUser as apiLogout, isTokenValid } from "@/lib/api";
import { useRouter } from "next/navigation";

interface DashboardContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check if token exists and is valid
        if (!isTokenValid()) {
          router.push("/auth");
          return;
        }

        // Fetch current user
        const userData = await getCurrentUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user data"
        );
        apiLogout();
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [router]);

  const logout = () => {
    apiLogout();
    setUser(null);
    router.push("/auth");
  };

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh user data"
      );
    }
  };

  return (
    <DashboardContext.Provider
      value={{ user, loading, error, logout, refreshUser }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
