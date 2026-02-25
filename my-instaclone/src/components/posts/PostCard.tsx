import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { getImageUrl } from "@/lib/image-url";
import { Post } from "@/types/api";
import { useState } from "react";
import CommentsSection from "../comments/CommentsSection";
import { useLike } from "@/hooks/useLike";
import { useSave } from "@/hooks/useSave";

interface PostCardProps {
  post: Post | null;
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  if (!post) {
    return null;
  }

  // استفاده از useLike hook
  const {
    liked,
    count: likeCount,
    toggleLike,
    loading: likeLoading,
  } = useLike(post.id, false, post.likes_count || 0);

  // استفاده از useSave hook
  const { saved, toggleSave, loading: saveLoading } = useSave(post.id, false);

  // Use profile_image first (primary), fallback to avatar
  const avatarUrl =
    getImageUrl(post.user.profile_image || post.user.avatar) || "/avatar.png";
  const imageUrl =
    getImageUrl(post.images?.[0]?.image) ||
    getImageUrl(post.image) ||
    "/placeholder.png";

  const commentsCount = post.comments_count || 0;

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-card hover:border-gray-700 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Image
            src={avatarUrl}
            alt={post.user.username}
            width={40}
            height={40}
            unoptimized
            className="rounded-full object-cover w-10 h-10"
          />
          <Link
            href={`/profile/${post.user.username}`}
            className="font-semibold text-sm hover:underline"
          >
            {post.user.username}
          </Link>
        </div>
        <button className="text-gray-600 hover:text-gray-400 transition-colors p-1">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-square bg-gray-900">
          <Image
            src={imageUrl}
            alt={post.caption || `Post by ${post.user.username}`}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              disabled={likeLoading}
              className="text-gray-500 hover:text-red-500 transition-colors group disabled:opacity-50"
            >
              <Heart
                size={24}
                className={`transition-all ${
                  liked
                    ? "fill-red-500 text-red-500"
                    : "group-hover:fill-red-500 group-hover:text-red-500"
                }`}
              />
            </button>
            <Link
              href={`/post/${post.id}`}
              onClick={toggleComments}
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle size={24} />
            </Link>
            <button className="text-gray-500 hover:text-green-500 transition-colors">
              <Share2 size={24} />
            </button>
          </div>
          <button
            onClick={toggleSave}
            disabled={saveLoading}
            className="text-gray-600 hover:text-yellow-400 transition-colors disabled:opacity-50"
          >
            <Bookmark
              size={24}
              className={`transition-all ${
                saved ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 pt-2 pb-3">
        <div className="flex gap-4 text-sm text-gray-400 mb-2">
          <span className="font-semibold text-gray-600 cursor-pointer hover:text-gray-400">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </span>
          <Link
            href={`/post/${post.id}`}
            className="text-gray-600 hover:text-gray-400 cursor-pointer"
          >
            {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
          </Link>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="mb-2">
            <p className="text-sm">
              <span className="font-semibold mr-2 text-grat-900 hover:text-gray-800 cursor-pointer">
                {post.user.username}
              </span>
              <span className="text-gray-600">{post.caption}</span>
            </p>
          </div>
        )}

        {/* Show Comments Label */}
        <button
          onClick={toggleComments}
          className="text-sm text-gray-500 hover:text-black transition"
        >
          {showComments ? "Hide comments" : "Show comments"}
        </button>

        {/* Comments Section */}
        {showComments && <CommentsSection postId={post.id} />}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 m-1">
          {formatDate(post.created_at)}
        </div>
      </div>
    </div>
  );
}
