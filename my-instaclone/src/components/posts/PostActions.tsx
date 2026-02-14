"use client";

import { useState } from "react";
import { toggleLiked } from "@/services/likes";
import { Heart } from "lucide-react";

interface Props {
  postId: number;
  initialLiked: boolean;
  initialLikesCount: number;
}

export default function PostActions({
  postId,
  initialLiked,
  initialLikesCount,
}: Props) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;

    setLoading(true);
    const wasLiked = isLiked;
    const previousCount = likesCount;

    // optimistic update
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await toggleLiked(postId);
    } catch (err) {
      console.error("Failed to toggle like:", err);
      // rollback
      setIsLiked(wasLiked);
      setLikesCount(previousCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggleLike} className="flex items-center gap-1">
      <Heart
        className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span className="text-sm">{likesCount}</span>
    </button>
  );
}
