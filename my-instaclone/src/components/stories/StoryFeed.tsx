"use client";

import StoryCard from "./StoryCard";
import { useStories } from "@/hooks/useStories";

export default function StoryFeed() {
  const { stories, loading, error } = useStories();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
