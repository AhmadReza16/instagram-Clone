"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/image-url";
import { followUser, unfollowUser } from "@/services/follow";
import { MessageCircle } from "lucide-react";

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
  console.log("SearchUsers component received:", users);

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

  if (!users || users.length === 0) {
    return <div className="text-gray-400 text-center py-8">No users found</div>;
  }

  const handleFollowToggle = async (userId: number, isFollowing: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [userId]: true }));
    try {
      console.log(
        `Toggling follow for user ${userId}, currently following: ${isFollowing}`,
      );
      if (isFollowing) {
        await unfollowUser(userId);
        console.log("Unfollowed successfully");
      } else {
        await followUser(userId);
        console.log("Followed successfully");
      }
      // Update the state after successful operation
      setFollowingMap((prev) => {
        const newState = {
          ...prev,
          [userId]: !isFollowing,
        };
        console.log("New following state:", newState);
        return newState;
      });
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      alert("Failed to update follow status");
    } finally {
      setLoadingMap((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {users.map((user) => {
        // Use profile_image first (primary), fallback to avatar
        const rawImage = user.profile_image || user.avatar;

        // Normalize backend image formats: may be string, object with `url` or `name`, or null
        let normalizedPath: string | undefined;
        if (rawImage) {
          if (typeof rawImage === "string") {
            normalizedPath = rawImage;
          } else if (typeof rawImage === "object") {
            if (
              (rawImage as any).url &&
              typeof (rawImage as any).url === "string"
            ) {
              normalizedPath = (rawImage as any).url;
            } else if ((rawImage as any).name) {
              normalizedPath = `/media/${(rawImage as any).name}`;
            } else {
              // Fallback to string coercion
              normalizedPath = String(rawImage);
            }
          }
        }

        const avatarUrl = normalizedPath
          ? getImageUrl(normalizedPath)
          : undefined;

        // CRITICAL: Ensure finalAvatarUrl is always a string
        const finalAvatarUrl = (() => {
          // Priority: avatarUrl if it's a valid string
          if (typeof avatarUrl === "string" && avatarUrl.length > 0) {
            return avatarUrl;
          }
          // Fallback to placeholder
          return "/placeholder.png";
        })();

        console.log(`User ${user.username}:`, {
          raw_profile_image: user.profile_image,
          raw_avatar: user.avatar,
          rawImage,
          normalizedPath,
          avatarUrlFromGetImageUrl: avatarUrl,
          avatarUrlType: typeof avatarUrl,
          finalAvatarUrl,
          finalAvatarUrlType: typeof finalAvatarUrl,
          is_following: user.is_following,
        });
        const isFollowing = followingMap[user.id];
        const isLoading = loadingMap[user.id];

        return (
          <div
            key={user.id}
            className="flex items-center gap-4 justify-between bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Link
              href={`/profile/${user.username}`}
              className="flex items-center gap-4 flex-1"
            >
              <div className="flex-shrink-0">
                <Image
                  src={finalAvatarUrl}
                  alt={user.username}
                  width={48}
                  height={48}
                  unoptimized
                  className="rounded-full object-cover w-12 h-12"
                  onError={(e: any) => {
                    console.error(
                      `Image failed to load for ${user.username}:`,
                      finalAvatarUrl,
                    );
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-white hover:text-blue-400 transition-colors">
                  {user.username}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {/* Message Button */}
              <Link
                href={`/messages?user=${user.username}`}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                title="Send message"
              >
                <MessageCircle size={18} />
              </Link>

              {/* Follow/Unfollow Button */}
              <button
                onClick={() =>
                  handleFollowToggle(user.id, isFollowing || false)
                }
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 whitespace-nowrap ${
                  isFollowing
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
