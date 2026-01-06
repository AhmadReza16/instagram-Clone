"use client";

import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { usePosts } from "@/hooks/usePosts";
import { useStories } from "@/hooks/useStories";
import StoryFeed from "@/components/stories/StoryFeed";
import { PostCard } from "@/components/posts/PostCard";

import { useState, useEffect, Fragment } from "react";

export default function FeedPage() {
  const {
    posts,
    isLoading: postsLoading,
    isError: postsError,
  } = usePosts({ type: "feed" });

  const {
    stories,
    isLoading: storiesLoading,
    isError: storiesError,
  } = useStories({ type: "feed" });
  const [loading, setLoading] = useState(true); // ← تعریف کن
  const [data, setData] = useState(null);

  useEffect(() => {
    // فچ داده‌ها
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false); // بعد از دریافت، false کن
      });
  }, []);

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
          posts.length > 0 &&
          posts.map((post) => <PostCard key={post.id} post={post} />)}
      </section>
    </main>
  );
}
