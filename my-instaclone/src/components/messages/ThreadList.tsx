import { ThreadItem } from "./ThreadItem";

export function ThreadList({ threads }: { threads: any[] }) {
  return (
    <div className="divide-y">
      {threads.map((t) => (
        <ThreadItem key={t.id} thread={t} />
      ))}
    </div>
  );
}
