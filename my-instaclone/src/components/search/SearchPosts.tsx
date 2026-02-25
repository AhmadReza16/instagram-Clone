import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/image-url";

interface SearchPost {
  id: number;
  image?: string;
  images?: any[];
  caption?: string;
  user?: {
    username: string;
  };
}

interface SearchPostsProps {
  posts: SearchPost[];
}

export function SearchPosts({ posts }: SearchPostsProps) {
  console.log("SearchPosts component received:", posts);

  if (!posts || posts.length === 0) {
    return <div className="text-gray-400 text-center py-8">No posts found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {posts.map((post) => {
        // Handle both single image and multiple images
        let imageUrl: string | undefined;

        if (post.image) {
          imageUrl = getImageUrl(post.image);
        } else if (
          post.images &&
          Array.isArray(post.images) &&
          post.images.length > 0
        ) {
          const firstImage = post.images[0];
          imageUrl = getImageUrl(
            typeof firstImage === "string" ? firstImage : firstImage.image,
          );
        }

        if (!imageUrl) {
          console.warn(`Post ${post.id} has no valid image`);
          return null;
        }

        return (
          <Link key={post.id} href={`/post/${post.id}`} className="group">
            <div className="relative aspect-square overflow-hidden bg-gray-900 rounded-lg">
              <Image
                src={imageUrl}
                alt={post.caption || "Post"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                unoptimized
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-semibold">View</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
