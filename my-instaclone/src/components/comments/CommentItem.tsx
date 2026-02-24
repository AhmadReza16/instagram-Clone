import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { getImageUrl } from "@/lib/image-url";

interface CommentItemProps {
  comment: {
    id: number | string;
    user?: {
      username: string;
      avatar?: string | null;
      profile_image?: string | null;
    } | null;
    content?: string;
    text?: string;
    created_at: string;
  };
}

export function CommentItem({ comment }: CommentItemProps) {
  if (!comment) {
    return null;
  }

  // Safe access to user object with fallback
  const user =
    comment.user && typeof comment.user === "object"
      ? comment.user
      : {
          username: "Unknown",
          avatar: undefined,
          profile_image: undefined,
        };

  // Use profile_image first (primary), fallback to avatar
  const avatarUrl =
    getImageUrl(user.profile_image || user.avatar) || "/avatar.png";

  // Support both content and text field names
  const text = comment.content || comment.text || "";
  const username = user?.username || "Unknown";
  const createdAt = comment.created_at || new Date().toISOString();

  return (
    <div className="flex gap-3">
      <Image
        src={avatarUrl}
        alt={username}
        width={36}
        height={36}
        unoptimized
        className="rounded-full object-cover w-9 h-9"
      />

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {text || "(empty comment)"}
        </p>

        <span className="text-xs text-muted-foreground">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
