"use client";

import { useEffect, useState } from "react";
import { fetchThreads } from "@/services/messages";

export function useThreads() {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchThreads()
      .then(setThreads)
      .catch((err) => setError(err.message || "Failed to fetch threads"))
      .finally(() => setLoading(false));
  }, []);

  return { threads, loading, error };
}
