"use client";

import StoryCard from "./StoryCard";
import { useStories } from "@/hooks/useStories";
import { Story } from "@/types/api";

interface StoryFeedProps {
  stories?: Story[];
  type?: string;
}

export default function StoryFeed({
  stories: propStories,
  type,
}: StoryFeedProps) {
  const { stories: hookStories, loading, error } = useStories({ type });

  // Use provided stories or hook stories
  const stories = propStories || hookStories;

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stories || stories.length === 0) return null;

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
