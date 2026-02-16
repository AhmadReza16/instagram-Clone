"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-url";

interface User {
  username: string;
  avatar?: string;
  profile_image?: string;
}

export function AddStoryButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get("/users/profile/");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!user) return null;

  // Use profile_image first (from User model), fallback to avatar (from Profile model)
  const avatarUrl =
    getImageUrl(user.profile_image || user.avatar) || "/avatar.png";

  return (
    <Link
      href="/stories/create"
      className="flex flex-col items-center gap-2 flex-shrink-0"
    >
      {/* Add Story Circle */}
      <div className="relative w-20 h-20 flex-shrink-0 group">
        <Image
          src={avatarUrl}
          alt="Your story"
          width={80}
          height={80}
          unoptimized
          className="w-full h-full rounded-full object-cover border-2 border-gray-700"
        />
        {/* Plus Icon */}
        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 border-2 border-gray-900">
          <Plus size={16} className="text-white" />
        </div>
      </div>
      {/* Username */}
      <span className="text-xs text-gray-400">Your story</span>
    </Link>
  );
}
