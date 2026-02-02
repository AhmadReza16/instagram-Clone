"use client";

import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { DiscoverBanner } from "@/components/discover/DiscoverBanner";
import { usePosts } from "@/hooks/usePosts";
import { useStories } from "@/hooks/useStories";
import StoryFeed from "@/components/stories/StoryFeed";
import { PostCard } from "@/components/posts/PostCard";

import { Fragment, useState } from "react";

export default function FeedPage() {
  // حالت: feed یا suggested
  const [showSuggested, setShowSuggested] = useState(false);

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

  const {
    stories,
    isLoading: storiesLoading,
    isError: storiesError,
  } = useStories({ type: "feed" });

  // اگر feed خالی است، automatic طور suggested posts نشان بده
  const feedPostsExists = feedPosts && feedPosts.length > 0;
  const suggestedPostsExists = suggestedPosts && suggestedPosts.length > 0;

  const posts = feedPostsExists
    ? feedPosts
    : suggestedPostsExists
      ? suggestedPosts
      : [];
  const postsLoading = !feedPostsExists ? suggestedLoading : feedLoading;
  const postsError = !feedPostsExists ? suggestedError : feedError;
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

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="Follow people to see their posts here."
      />
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      {/* STORIES */}
      <section className="mb-6">
        {storiesLoading && (
          <div className="h-24 rounded-xl bg-muted animate-pulse" />
        )}

        {storiesError && (
          <p className="text-sm text-destructive">Failed to load stories</p>
        )}

        {!storiesLoading && !storiesError && stories.length > 0 && (
          <StoryFeed stories={stories} />
        )}
      </section>

      {/* DISCOVER BANNER - اگر suggested posts نمایش داده شود */}
      {!hasFeedPosts && suggestedPosts.length > 0 && (
        <DiscoverBanner showFollow={true} />
      )}

      {/* POSTS */}
      <section className="space-y-6">
        {postsLoading && (
          <Fragment>
            <div className="h-96 rounded-xl bg-muted animate-pulse" />
            <div className="h-96 rounded-xl bg-muted animate-pulse" />
          </Fragment>
        )}

        {postsError && (
          <p className="text-sm text-destructive">Failed to load posts</p>
        )}

        {!postsLoading && !postsError && posts.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No posts to show
          </p>
        )}

        {!postsLoading &&
          !postsError &&
          posts &&
          posts.length > 0 &&
          posts.map((post) => {
            if (!post) return null;
            // Ensure post has required image field
            const postWithImage = {
              ...post,
              image:
                post.image || post.images?.[0]?.image || "/placeholder.png",
            };
            return <PostCard key={post.id} post={postWithImage} />;
          })}
      </section>
    </main>
  );
}
