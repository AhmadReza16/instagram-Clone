"use client";

import { useEffect, useState } from "react";
import { searchUsers } from "@/services/search";

export function useSearch(query: string) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      searchUsers(query)
        .then(setResults)
        .catch((err) => {
          setError(err.message || "Search failed");
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
}
