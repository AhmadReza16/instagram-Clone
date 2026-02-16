import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/image-url";
import { Story } from "@/types/api";

interface StoryCircleProps {
  story: Story;
}

export function StoryCircle({ story }: StoryCircleProps) {
  // Get user info from owner or author
  const user =
    typeof story.owner === "object"
      ? story.owner
      : story.author
        ? story.author
        : {
            username: typeof story.owner === "string" ? story.owner : "Unknown",
          };

  const username = (user as any)?.username || "Unknown";
  // Use profile_image first (primary), fallback to avatar
  const avatarUrl =
    getImageUrl((user as any)?.profile_image || (user as any)?.avatar) ||
    "/avatar.png";

  return (
    <Link
      href={`/stories/${story.id}`}
      className="flex flex-col items-center gap-2 flex-shrink-0"
    >
      {/* Story Circle */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full p-0.5">
          <div className="w-full h-full bg-gray-900 rounded-full p-0.5 flex items-center justify-center">
            <Image
              src={avatarUrl}
              alt={username}
              width={72}
              height={72}
              unoptimized
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Username */}
      <span className="text-xs text-gray-400 truncate max-w-[80px]">
        {username}
      </span>
    </Link>
  );
}
