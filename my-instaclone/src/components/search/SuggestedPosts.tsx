"use client";

import { useEffect, useState } from "react";
import { getSuggestedPosts } from "@/services/search";
import { PostCard } from "@/components/posts/PostCard";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";

export function SuggestedPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getSuggestedPosts();
        setPosts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No suggested posts at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Suggested For You
        </h2>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
