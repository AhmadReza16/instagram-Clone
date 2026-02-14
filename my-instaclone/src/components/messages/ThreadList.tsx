import { ThreadItem } from "./ThreadItem";

interface Thread {
  id: number;
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  last_message?: string;
  unread_count?: number;
}

type Props = {
  threads?: Thread[];
};

export function ThreadList({ threads = [] }: Props) {
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
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
