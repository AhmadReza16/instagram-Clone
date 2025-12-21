import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

interface CommentItemProps {
  comment: {
    id: number;
    user: {
      username: string;
      avatar?: string;
    };
    content: string;
    created_at: string;
  };
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3">
      <Image
        src={comment.user.avatar || "/avatar.png"}
        alt={comment.user.username}
        width={36}
        height={36}
        className="rounded-full"
      />

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold mr-2">{comment.user.username}</span>
          {comment.content}
        </p>

        <span className="text-xs text-muted-foreground">
          {formatDate(comment.created_at)}
        </span>
      </div>
    </div>
  );
}
