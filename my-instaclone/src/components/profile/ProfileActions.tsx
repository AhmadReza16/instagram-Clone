"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFollow } from "@/hooks/useFollow";

interface ProfileActionProps {
  profile: {
    id: number;
    username: string;
    is_following?: boolean;
    followers_count?: number;
  };
}

export function ProfileActions({ profile }: ProfileActionProps) {
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
    return (
      <Link href="/profile/edit">
        <Button>Edit Profile</Button>
      </Link>
    );
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
