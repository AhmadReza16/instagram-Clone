"use client";

import { useEffect, useState } from "react";
import { fetchProfile } from "@/services/users";

export function useProfile(username: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile(username)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [username]);

  return { profile, loading };
}
