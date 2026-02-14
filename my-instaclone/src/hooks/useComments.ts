"use client";

import { useEffect, useState } from "react";
import { fetchComments, createComment } from "@/services/comments";

export function useComments(postId: number) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments(postId)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [postId]);

  const addComment = async (content: string) => {
    try {
      const newComment = await createComment(postId, content);
      setComments((prev) => [...prev, newComment]);
      return newComment;
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  };

  return { comments, loading, addComment };
}
