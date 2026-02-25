"use client";

import { useEffect, useState } from "react";
import { fetchHighlights } from "@/services/highlights";

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
      .then((data) => {
        // Handle both highlight and story array formats
        const items = Array.isArray(data) ? data : data?.results || [];
        
        // Transform stories to highlight format if needed
        const highlights = items.map((item: any) => {
          // If it's a story (has 'media' field), convert to highlight format
          if (item.media && !item.cover) {
            return {
              id: item.id,
              title: item.caption || `Story ${item.id}`,
              cover: item.media,
              stories: [item], // Include the story data
              ...item
            };
          }
          return item;
        });
        
        setHighlights(highlights);
      })
      .catch((err) => setError(err.message || "Failed to fetch highlights"))
      .finally(() => setLoading(false));
  }, [username]);

  const open = async (id: number) => {
    try {
      // Find the highlight from the already loaded list
      const highlight = highlights.find(h => h.id === id);
      if (highlight) {
        setActive(highlight);
      } else {
        setError("Highlight not found");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load highlight");
    }
  };

  const close = () => setActive(null);

  return { highlights, active, open, close, loading, error };
}
