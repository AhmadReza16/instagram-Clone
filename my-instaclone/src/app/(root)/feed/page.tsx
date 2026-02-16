"use client";

import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { DiscoverBanner } from "@/components/discover/DiscoverBanner";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "@/components/posts/PostCard";
import { StoryStrip } from "@/components/stories/StoryStrip";

export default function FeedPage() {
  const {
    posts: feedPosts,
    isLoading: feedLoading,
    isError: feedError,
  } = usePosts({ type: "feed" });

  const {
    posts: suggestedPosts,
    isLoading: suggestedLoading,
    isError: suggestedError,
  } = usePosts({ type: "suggested" });

  const feedPostsExists = feedPosts && feedPosts.length > 0;
  const suggestedPostsExists = suggestedPosts && suggestedPosts.length > 0;

  const posts = feedPostsExists
    ? feedPosts
    : suggestedPostsExists
      ? suggestedPosts
      : [];
  const postsLoading = feedLoading || suggestedLoading;
  const postsError = feedPostsExists ? feedError : suggestedError;
  const hasFeedPosts = feedPostsExists;

  if (postsLoading) {
    return <FeedSkeleton />;
  }

  if (postsError) {
    return (
      <ErrorState
        title="Failed to load feed"
        description="We couldn't fetch posts. Check your internet connection."
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Stories Section - Sticky */}
        <section className="border-b border-gray-800 m-4 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
          <StoryStrip />
        </section>

        {/* Feed Content */}
        <div className="divide-y divide-gray-800">
          {/* Discover Banner */}
          {!hasFeedPosts && suggestedPosts.length > 0 && (
            <div className="p-4">
              <DiscoverBanner showFollow={true} />
            </div>
          )}

          {/* Posts List */}
          {posts.length === 0 ? (
            <div className="py-12">
              <EmptyState
                title="No posts to show"
                description="Follow more people to see their posts in your feed"
              />
            </div>
          ) : (
            posts.map((post) => {
              if (!post) return null;
              return (
                <div
                  key={post.id}
                  className="border-b border-gray-800 hover:bg-gray-950/30 transition-colors"
                >
                  <PostCard post={post} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
