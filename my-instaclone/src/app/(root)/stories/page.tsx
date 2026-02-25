"use client";

import { useEffect, useState } from "react";
import { getFeedStories } from "@/services/stories";
import { Story } from "@/types/api";
import StoryCard from "@/components/stories/StoryCard";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const data = await getFeedStories();
      setStories(Array.isArray(data) ? data : []);
      setError(false);
    } catch (err) {
      setError(true);
      console.error("Failed to fetch stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <ErrorState
        title="Failed to load stories"
        description="Please try again later."
        onRetry={fetchStories}
      />
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Stories</h1>
        <Link
          href="/stories/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Story
        </Link>
      </div>

      {/* Stories Grid */}
      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <h2 className="text-xl font-semibold">No stories yet</h2>
          <p className="text-gray-400 max-w-md">
            Follow users to see their stories, or create your own!
          </p>
          <Link
            href="/stories/create"
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Create Story
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </main>
  );
}
