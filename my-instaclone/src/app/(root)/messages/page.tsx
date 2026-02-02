"use client";

import { useThreads } from "@/hooks/useThreads";
import { ThreadList } from "@/components/messages/ThreadList";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";

export default function MessagesPage() {
  const { threads, loading } = useThreads();

  if (loading) return <FeedSkeleton />;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold p-4">Messages</h1>
      <ThreadList threads={threads} />
    </div>
  );
}
