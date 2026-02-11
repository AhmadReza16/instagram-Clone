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

  const ToggleFollow = async () => {
    setIsFollowing(!isFollowing);
    setFollowers((c) => (isFollowing ? c - 1 : c + 1));

    try {
      isFollowing
        ? await toggleFollow(userId) // follow
        : await toggleFollow(userId); // unfollow
        
    } catch {
      setIsFollowing(initialFollowing);
      setFollowers(initialCount);
    }
  };

  return { isFollowing, followers, ToggleFollow };
}
