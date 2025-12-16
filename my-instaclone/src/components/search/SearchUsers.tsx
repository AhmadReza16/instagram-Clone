import Link from "next/link";
import Image from "next/image";

export function SearchUsers({ users }: any) {
  return (
    <div className="space-y-4 mt-4">
      {users.map((u: any) => (
        <Link
          key={u.id}
          href={`/profile/${u.username}`}
          className="flex items-center gap-4"
        >
          <Image
            src={u.avatar}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{u.username}</span>
        </Link>
      ))}
    </div>
  );
}
