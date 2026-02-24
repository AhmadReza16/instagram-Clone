"use client";

import { useState, useEffect } from "react";
import { toggleLiked, isPostLiked } from "@/services/likes";

export function useLike(
  postId: number,
  initialLiked: boolean,
  initialCount: number
) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // بررسی اینکه آیا کاربر این پست را لایک کرده است
  useEffect(() => {
    const checkLiked = async () => {
      try {
        setChecking(true);
        const response = await isPostLiked(postId);
        if (response?.is_liked !== undefined) {
          setLiked(response.is_liked);
        }
      } catch (error) {
        console.error("Failed to check like status:", error);
      } finally {
        setChecking(false);
      }
    };

    checkLiked();
  }, [postId]);

  const toggleLike = async () => {
    if (loading || checking) return;
    
    setLoading(true);
    const wasLiked = liked;
    const previousCount = count;

    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));

    try {
      const response = await toggleLiked(postId);
      // Update based on actual API response
      if (response?.liked !== undefined) {
        setLiked(response.liked);
        // Update count based on final state
        if (response.liked) {
          setCount((c) => (wasLiked ? c : c + 1));
        } else {
          setCount((c) => (wasLiked ? c - 1 : c));
        }
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLiked(wasLiked);
      setCount(previousCount);
    } finally {
      setLoading(false);
    }
  };

  return { liked, count, toggleLike, loading: loading || checking };
}
