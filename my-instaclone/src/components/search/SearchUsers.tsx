import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

interface User {
  id: number;
  username: string;
  avatar?: string;
  profile_image?: string;
}

interface SearchUsersProps {
  users: User[];
}

export function SearchUsers({ users }: SearchUsersProps) {
  return (
    <div className="space-y-4 mt-4">
      {users
        .map((u) => {
          // Use profile_image first (primary), fallback to avatar
          const avatarUrl =
            getImageUrl(u.profile_image || u.avatar) || "/avatar.png";
          return { id: u.id, username: u.username, avatarUrl };
        })
        .map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.username}`}
            className="flex items-center gap-4"
          >
            <Image
              src={user.avatarUrl}
              alt={user.username}
              width={40}
              height={40}
              unoptimized
              className="rounded-full object-cover"
            />
            <span>{user.username}</span>
          </Link>
        ))}
    </div>
  );
}
