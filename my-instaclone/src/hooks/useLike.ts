"use client";

import { useState } from "react";
import { toggleLiked } from "@/services/likes";

export function useLike(
  postId: number,
  initialLiked: boolean,
  initialCount: number
) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    const wasLiked = liked;
    const previousCount = count;

    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));

    try {
      await toggleLiked(postId);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLiked(wasLiked);
      setCount(previousCount);
    } finally {
      setLoading(false);
    }
  };

  return { liked, count, toggleLike, loading };
}
