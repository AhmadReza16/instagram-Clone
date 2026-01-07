"use client";

import { useEffect, useState } from "react";
import { fetchProfile } from "@/services/users";

export function useProfile(username: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    fetchProfile(username)
      .then(setProfile)
      .catch((err) => {
        setError(err.message || "Failed to fetch profile");
      })
      .finally(() => setLoading(false));
  }, [username]);

  return { profile, loading, error };
}
