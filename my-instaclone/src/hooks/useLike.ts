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

  const toggleLike = async () => {
    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));

    try {
      liked ? await toggleLiked(postId)
    } catch {
      setLiked(liked);
      setCount(initialCount);
    }
  };

  return { liked, count, toggleLike };
}
