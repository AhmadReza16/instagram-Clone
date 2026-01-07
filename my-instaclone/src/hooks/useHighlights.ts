"use client";

import { useEffect, useState } from "react";
import {
  fetchHighlights,
  fetchHighlightDetail,
} from "@/services/highlights";

export function useHighlights(username: string) {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [active, setActive] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    fetchHighlights(username)
      .then(setHighlights)
      .catch((err) => setError(err.message || "Failed to fetch highlights"))
      .finally(() => setLoading(false));
  }, [username]);

  const open = async (id: number) => {
    try {
      const data = await fetchHighlightDetail(id);
      setActive(data);
    } catch (err: any) {
      setError(err.message || "Failed to load highlight");
    }
  };

  const close = () => setActive(null);

  return { highlights, active, open, close, loading, error };
}
