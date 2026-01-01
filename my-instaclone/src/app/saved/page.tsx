"use client";

import { useEffect, useState } from "react";
import { getSavedPosts } from "@/services/posts";
import { PostCard } from "@/components/posts/PostCard";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";

export default function SavedPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSavedPosts = async () => {
    try {
      setLoading(true);
      const data = await getSavedPosts();
      setPosts(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <ErrorState
        title="Failed to load saved posts"
        description="Please try again later."
        onRetry={fetchSavedPosts}
      />
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No saved posts"
        description="Save posts to see them here."
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 py-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
