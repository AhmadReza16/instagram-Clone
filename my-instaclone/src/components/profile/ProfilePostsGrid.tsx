import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

export function ProfilePostsGrid({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      {/* Grid Header */}
      <div className="border-t border-gray-800 py-6">
        <h2 className="text-gray-400 uppercase text-xs font-semibold tracking-wider">
          Posts
        </h2>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => {
          // Get first image from PostImages array
          const imageUrl = post.images?.[0]?.image || post.image;

          if (!imageUrl) return null;

          return (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="relative aspect-square group overflow-hidden bg-gray-900"
            >
              <Image
                src={imageUrl}
                alt={post.caption || "Post"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-white">
                  <Heart size={24} className="fill-white" />
                  <span className="font-semibold">{post.likes_count || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle size={24} />
                  <span className="font-semibold">
                    {post.comments_count || 0}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
