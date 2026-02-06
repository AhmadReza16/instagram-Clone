import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export function ThreadItem({ thread }: any) {
  const avatarUrl = thread.user?.avatar;
  const lastMessage = thread.last_message || "No messages yet";
  const unreadCount = thread.unread_count || 0;

  return (
    <Link
      href={`/messages/${thread.id}`}
      className="flex items-center gap-3 p-3 hover:bg-gray-900 border-b border-gray-800 transition-colors"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={thread.user?.username || "User"}
            width={48}
            height={48}
            className="rounded-full object-cover"
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
          {thread.user?.username || "Unknown User"}
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
