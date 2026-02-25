import { ThreadItem } from "./ThreadItem";

interface Thread {
  id: number;
  user?: {
    id: number;
    username: string;
    avatar?: string;
  };
  other_user?: {
    id: number;
    username: string;
    avatar?: string;
  };
  last_message?: string;
  unread_count?: number;
}

type Props = {
  threads?: Thread[];
  highlightUser?: string | null;
};

export function ThreadList({ threads = [], highlightUser }: Props) {
  if (!Array.isArray(threads)) {
    return null; // یا Error UI
  }

  if (threads.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-4">
        There is no chat here yet.{" "}
      </div>
    );
  }

  return (
    <div className="divide-y">
      {threads.map((thread) => {
        const otherUser = thread.other_user || thread.user;
        const isHighlighted =
          highlightUser && otherUser?.username === highlightUser;

        return (
          <ThreadItem
            key={thread.id}
            thread={thread}
            isHighlighted={isHighlighted}
          />
        );
      })}
    </div>
  );
}
