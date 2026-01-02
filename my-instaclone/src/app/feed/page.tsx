import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import StoryFeed from "@/components/stories/StoryFeed";
import error from "next/error";

export default function FeedPage() {
  if (loading) {
    return <FeedSkeleton />;
  }
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="Follow people to see their posts here."
      />
    );
  }
  if (error) {
    return (
      <ErrorState
        title="Failed to load feed"
        description="We couldn’t fetch posts. Check your internet connection."
        onRetry={refetch}
      />
    );
  }
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>
      <StoryFeed />
    </main>
  );
}
