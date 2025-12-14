"use client";

import { useState } from "react";
import { followUser, unfollowUser } from "@/services/follow";

export function useFollow(
  userId: number,
  initialFollowing: boolean,
  initialCount: number
) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [followers, setFollowers] = useState(initialCount);

  const toggleFollow = async () => {
    setIsFollowing(!isFollowing);
    setFollowers((c) => (isFollowing ? c - 1 : c + 1));

    try {
      isFollowing
        ? await unfollowUser(userId)
        : await followUser(userId);
    } catch {
      setIsFollowing(initialFollowing);
      setFollowers(initialCount);
    }
  };

  return { isFollowing, followers, toggleFollow };
}
