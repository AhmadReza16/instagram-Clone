import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

interface StoryAvatarProps {
  story: {
    id: number;
    is_seen?: boolean;
    user: {
      avatar: string;
      username: string;
    };
  };
  onClick: () => void;
}

export function StoryAvatar({ story, onClick }: StoryAvatarProps) {
  const avatarUrl = getImageUrl(story.user.avatar);

  return (
    <button onClick={onClick} className="text-center">
      <div
        className={`p-1 rounded-full ${
          story.is_seen
            ? "bg-gray-300"
            : "bg-linear-to-tr from-pink-500 to-yellow-500"
        }`}
      >
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt=""
            width={56}
            height={56}
            unoptimized
            className="rounded-full border-2 border-white object-cover"
          />
        )}
      </div>
      <span className="text-xs">{story.user.username}</span>
    </button>
  );
}
