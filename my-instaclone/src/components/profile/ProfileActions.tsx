"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFollow } from "@/hooks/useFollow";

export function ProfileActions({ profile }: { profile: any }) {
  const { user, loading } = useAuth();

  // Always call hooks in the same order - never conditionally
  const { isFollowing, toggleFollow } = useFollow(
    profile.id,
    profile.is_following,
    profile.followers_count,
  );

  if (loading) {
    return <Button disabled>Loading...</Button>;
  }

  if (user?.username === profile.username) {
    return <Button>Edit Profile</Button>;
  }

  return (
    <Button
      variant={isFollowing ? "secondary" : "default"}
      onClick={toggleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
