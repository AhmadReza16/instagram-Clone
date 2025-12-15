"use client";

import { useEffect, useState } from "react";
import { fetchThreads } from "@/services/messages";

export function useThreads() {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads()
      .then(setThreads)
      .finally(() => setLoading(false));
  }, []);

  return { threads, loading };
}
