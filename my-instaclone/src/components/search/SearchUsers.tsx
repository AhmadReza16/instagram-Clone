import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

interface User {
  id: number;
  username: string;
  avatar: string;
}

interface SearchUsersProps {
  users: User[];
}

export function SearchUsers({ users }: SearchUsersProps) {
  return (
    <div className="space-y-4 mt-4">
      {users.map((u) => {
        const avatarUrl = getImageUrl(u.avatar);

        return (
          <Link
            key={u.id}
            href={`/profile/${u.username}`}
            className="flex items-center gap-4"
          >
            <Image
              src={avatarUrl}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="rounded-full object-cover"
            />
            <span>{u.username}</span>
          </Link>
        );
      })}
    </div>
  );
}
