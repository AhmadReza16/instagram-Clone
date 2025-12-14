import Image from "next/image";
import Link from "next/link";

export function ProfilePostsGrid({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 mt-8">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <Image
            src={post.image}
            alt=""
            width={300}
            height={300}
            className="object-cover aspect-square"
          />
        </Link>
      ))}
    </div>
  );
}
