"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }

      if (!isAuthenticated()) {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return { user, loading };
}
