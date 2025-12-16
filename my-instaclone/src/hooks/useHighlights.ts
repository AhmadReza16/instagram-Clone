"use client";

import { useEffect, useState } from "react";
import {
  fetchHighlights,
  fetchHighlightDetail,
} from "@/services/highlights";

export function useHighlights(username: string) {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [active, setActive] = useState<any>(null);

  useEffect(() => {
    fetchHighlights(username).then(setHighlights);
  }, [username]);

  const open = async (id: number) => {
    const data = await fetchHighlightDetail(id);
    setActive(data);
  };

  const close = () => setActive(null);

  return { highlights, active, open, close };
}
