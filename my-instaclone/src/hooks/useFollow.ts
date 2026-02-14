"use client";

import { useState } from "react";
import { toggleFollow} from "@/services/follow";

export function useFollow(
  userId: number,
  initialFollowing: boolean,
  initialCount: number
) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [followers, setFollowers] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    if (loading) return;
    
    setLoading(true);
    const wasFollowing = isFollowing;
    const previousCount = followers;

    setIsFollowing(!isFollowing);
    setFollowers((c) => (isFollowing ? c - 1 : c + 1));

    try {
      await toggleFollow(userId);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      setIsFollowing(wasFollowing);
      setFollowers(previousCount);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, followers, toggleFollow, loading };
}
