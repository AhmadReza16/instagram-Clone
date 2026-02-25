import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { getImageUrl } from "@/lib/image-url";

interface ThreadItemProps {
  thread: {
    id: number;
    user?: {
      username: string;
      avatar?: string;
      profile_image?: string;
    };
    other_user?: {
      username: string;
      avatar?: string;
      profile_image?: string;
    };
    last_message?: string;
    unread_count?: number;
  };
  isHighlighted?: boolean;
}

export function ThreadItem({ thread, isHighlighted }: ThreadItemProps) {
  // Use other_user first (preferred), fallback to user
  const otherUser = thread.other_user || thread.user;

  // Use profile_image first (primary), fallback to avatar
  const rawImage = otherUser?.profile_image || otherUser?.avatar;
  let normalizedPath: string | undefined;
  if (rawImage) {
    if (typeof rawImage === "string") {
      normalizedPath = rawImage;
    } else if (typeof rawImage === "object") {
      if ((rawImage as any).url && typeof (rawImage as any).url === "string") {
        normalizedPath = (rawImage as any).url;
      } else if ((rawImage as any).name) {
        normalizedPath = `/media/${(rawImage as any).name}`;
      } else {
        normalizedPath = String(rawImage);
      }
    }
  }
  const avatarUrl = normalizedPath ? getImageUrl(normalizedPath) : undefined;

  const lastMessage = thread.last_message || "No messages yet";
  const unreadCount = thread.unread_count || 0;

  return (
    <Link
      href={`/messages/${thread.id}`}
      className={`flex items-center gap-3 p-3 hover:bg-gray-900 border-b border-gray-800 transition-colors ${
        isHighlighted ? "bg-gray-800" : ""
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={otherUser?.username || "User"}
            width={48}
            height={48}
            unoptimized
            className="rounded-full object-cover"
            onError={(e: any) => {
              console.error(
                `Failed to load avatar for ${otherUser?.username}:`,
                avatarUrl,
              );
              e.currentTarget.src = "/placeholder.png";
            }}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <User size={24} className="text-gray-500" />
          </div>
        )}
      </div>

      {/* Message Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">
          {otherUser?.username || "Unknown User"}
        </p>
        <p className="text-sm text-gray-400 truncate">{lastMessage}</p>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <span className="flex-shrink-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
