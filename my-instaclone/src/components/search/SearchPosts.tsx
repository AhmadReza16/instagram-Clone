import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/image-url";

interface Post {
  id: number;
  image: string;
}

interface SearchPostsProps {
  posts: Post[];
}

export function SearchPosts({ posts }: SearchPostsProps) {
  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {posts
        .map((p) => {
          const imageUrl = getImageUrl(p.image);
          return imageUrl ? { id: p.id, imageUrl } : null;
        })
        .filter(Boolean)
        .map((item: any) => (
          <Link key={item.id} href={`/post/${item.id}`}>
            <Image
              src={item.imageUrl}
              alt="Post"
              width={300}
              height={300}
              unoptimized
              className="aspect-square object-cover"
            />
          </Link>
        ))}
    </div>
  );
}
