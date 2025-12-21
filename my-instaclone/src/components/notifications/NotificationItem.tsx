import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

interface NotificationItemProps {
  notification: {
    id: number;
    actor: {
      username: string;
    };
    verb: string;
    target_url?: string;
    created_at: string;
  };
}

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <Link
      href={notification.target_url || "#"}
      className="block p-3 hover:bg-muted rounded-md"
    >
      <p className="text-sm">
        <span className="font-semibold">{notification.actor.username}</span>{" "}
        {notification.verb}
      </p>

      <span className="text-xs text-muted-foreground">
        {formatDate(notification.created_at)}
      </span>
    </Link>
  );
}
