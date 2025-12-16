import Image from "next/image";
import Link from "next/link";

export function SearchPosts({ posts }: any) {
  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {posts.map((p: any) => (
        <Link key={p.id} href={`/post/${p.id}`}>
          <Image
            src={p.image}
            alt=""
            width={300}
            height={300}
            className="aspect-square object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
