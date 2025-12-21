import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

interface PostCardProps {
  post: {
    id: number;
    user: {
      username: string;
      avatar?: string;
    };
    image: string;
    caption?: string;
    created_at: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <Image
          src={post.user.avatar || "/avatar.png"}
          alt={post.user.username}
          width={36}
          height={36}
          className="rounded-full"
        />
        <Link
          href={`/profile/${post.user.username}`}
          className="font-semibold text-sm"
        >
          {post.user.username}
        </Link>
      </div>

      {/* Image */}
      <Image
        src={post.image}
        alt="post"
        width={500}
        height={500}
        className="w-full object-cover"
      />

      {/* Content */}
      <div className="p-3 space-y-2">
        {post.caption && (
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
          </p>
        )}

        <Link
          href={`/post/${post.id}/comments`}
          className="text-xs text-muted-foreground"
        >
          View comments
        </Link>

        <span className="block text-xs text-muted-foreground">
          {formatDate(post.created_at)}
        </span>
      </div>
    </div>
  );
}
