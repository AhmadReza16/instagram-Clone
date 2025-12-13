"use client";

import { useEffect, useState } from "react";
import { getStories } from "@/services/stories";
import { Story } from "@/types/api";

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStories()
      .then(setStories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stories, loading, error };
}
