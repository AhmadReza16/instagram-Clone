"use client";

import { useState } from "react";
import { likePost, unlikePost } from "@/services/posts";
import { Heart } from "lucide-react";

interface Props {
  postId: string;
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

    // optimistic update
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      if (!isLiked) {
        await likePost(postId);
      } else {
        await unlikePost(postId);
      }
    } catch (err) {
      // rollback
      setIsLiked(isLiked);
      setLikesCount(initialLikesCount);
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
