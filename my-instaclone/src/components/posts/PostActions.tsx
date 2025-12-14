"use client";

import { Heart, Bookmark } from "lucide-react";
import { useLike } from "@/hooks/useLike";
import { useSave } from "@/hooks/useSave";

export function PostActions({ post }: { post: any }) {
  const { liked, count, toggleLike } = useLike(
    post.id,
    post.is_liked,
    post.likes_count
  );
  const { saved, toggleSave } = useSave(post.id, post.is_saved);

  return (
    <div className="flex items-center gap-4">
      <button onClick={toggleLike} className="flex items-center gap-1">
        <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
        <span>{count}</span>
      </button>

      <button onClick={toggleSave}>
        <Bookmark className={saved ? "fill-black" : ""} />
      </button>
    </div>
  );
}
