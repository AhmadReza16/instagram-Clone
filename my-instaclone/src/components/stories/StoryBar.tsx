"use client";

import { useEffect, useState } from "react";
import { getStoryById } from "@/services/stories";
import { StoryAvatar } from "./StoryAvatar";
import { useStoryStore } from "@/store/useStoryStore";

export function StoryBar() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const open = useStoryStore((s) => s.open);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getStoryById()
      .then(setStories)
      .catch((err: any) => {
        console.error("Failed to load stories:", err);
        setError(err.message || "Failed to load stories");
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-sm p-4">Failed to load stories</div>
    );
  }

  if (loading) {
    return <div className="text-gray-500 text-sm p-4">Loading stories...</div>;
  }

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {stories.map((story, index) => (
        <StoryAvatar
          key={story.id}
          story={story}
          onClick={() => open(stories, index)}
        />
      ))}
    </div>
  );
}
