"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useThreads } from "@/hooks/useThreads";
import { ThreadList } from "@/components/messages/ThreadList";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");
  const { threads, loading, error } = useThreads();

  useEffect(() => {
    if (userParam && threads && threads.length > 0) {
      // Find the thread with this user and scroll to it
      const thread = threads.find((t) => t.other_user?.username === userParam);
      if (thread) {
        console.log(`Navigating to conversation with ${userParam}`);
        // You can add logic here to select/open the conversation
      }
    }
  }, [userParam, threads]);

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <ErrorState
        title="Failed to load messages"
        description="We couldn't fetch your messages. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <EmptyState
        title="No messages yet"
        description="Start a conversation with someone to begin messaging."
      />
    );
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Messages Sidebar */}
      <div className="w-full md:w-1/3 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 p-4">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto">
          <ThreadList threads={threads} highlightUser={userParam} />
        </div>
      </div>

      {/* Chat Area - Shows on larger screens */}
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
        <p>Select a conversation to start messaging</p>
      </div>
    </div>
  );
}
