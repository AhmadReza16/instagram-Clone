import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { getImageUrl } from "@/lib/image-url";
import { Clock } from "lucide-react";

interface StoryCardProps {
  story: {
    id: number;
    owner: {
      id: number;
      username: string;
      profile_image?: string;
      avatar?: string;
    };
    media: string;
    caption?: string;
    created_at: string;
    expires_at: string;
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  const mediaUrl = getImageUrl(story.media) || "/placeholder.png";
  const avatarUrl =
    getImageUrl(story.owner.profile_image || story.owner.avatar) ||
    "/avatar.png";

  // Check if story is expired
  const isExpired = new Date(story.expires_at) < new Date();

  return (
    <Link href={`/stories/${story.id}`}>
      <div
        className={`relative group cursor-pointer rounded-lg overflow-hidden bg-gray-900 aspect-video ${isExpired ? "opacity-50" : ""}`}
      >
        {/* Thumbnail */}
        <Image
          src={mediaUrl}
          alt={`Story by ${story.owner.username}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <Image
              src={avatarUrl}
              alt={story.owner.username}
              width={28}
              height={28}
              unoptimized
              className="rounded-full object-cover w-7 h-7 border border-white"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {story.owner.username}
              </p>
              <p className="text-gray-300 text-xs flex items-center gap-1">
                <Clock size={12} />
                {formatDate(story.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Caption preview */}
        {story.caption && (
          <div className="absolute top-0 left-0 right-0 p-3 bg-black/40 max-h-20 overflow-hidden">
            <p className="text-white text-xs line-clamp-2">{story.caption}</p>
          </div>
        )}

        {/* Expired Badge */}
        {isExpired && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-gray-400 text-sm font-semibold">Expired</span>
          </div>
        )}
      </div>
    </Link>
  );
}
