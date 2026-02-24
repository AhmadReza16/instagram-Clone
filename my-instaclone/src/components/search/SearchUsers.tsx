"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/image-url";
import { followUser, unfollowUser } from "@/services/follow";

interface User {
  id: number;
  username: string;
  avatar?: string;
  profile_image?: string;
  is_following?: boolean;
}

interface SearchUsersProps {
  users: User[];
}

export function SearchUsers({ users }: SearchUsersProps) {
  const [followingMap, setFollowingMap] = useState<Record<number, boolean>>(
    users.reduce(
      (acc, u) => {
        acc[u.id] = u.is_following || false;
        return acc;
      },
      {} as Record<number, boolean>,
    ),
  );
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});

  const handleFollowToggle = async (userId: number, isFollowing: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [userId]: true }));
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      setFollowingMap((prev) => ({
        ...prev,
        [userId]: !isFollowing,
      }));
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {users.map((user) => {
        // Use profile_image first (primary), fallback to avatar
        const avatarUrl =
          getImageUrl(user.profile_image || user.avatar) || "/avatar.png";
        const isFollowing = followingMap[user.id];
        const isLoading = loadingMap[user.id];

        return (
          <div
            key={user.id}
            className="flex items-center gap-4 justify-between bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Link
              href={`/profile/${user.username}`}
              className="flex items-center gap-4 flex-1"
            >
              <Image
                src={avatarUrl}
                alt={user.username}
                width={40}
                height={40}
                unoptimized
                className="rounded-full object-cover w-10 h-10"
              />
              <span className="font-semibold hover:text-blue-400 transition-colors">
                {user.username}
              </span>
            </Link>
            <button
              onClick={() => handleFollowToggle(user.id, isFollowing)}
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
                isFollowing
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? "..." : isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
