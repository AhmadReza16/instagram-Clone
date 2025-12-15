import Link from "next/link";
import Image from "next/image";

export function ThreadItem({ thread }: any) {
  return (
    <Link
      href={`/messages/${thread.id}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-100"
    >
      <Image
        src={thread.user.avatar}
        alt=""
        width={48}
        height={48}
        className="rounded-full"
      />

      <div className="flex-1">
        <p className="font-medium">{thread.user.username}</p>
        <p className="text-sm text-gray-500 truncate">{thread.last_message}</p>
      </div>

      {thread.unread_count > 0 && (
        <span className="bg-blue-500 text-white text-xs px-2 rounded-full">
          {thread.unread_count}
        </span>
      )}
    </Link>
  );
}
