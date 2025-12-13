"use client";

import { useEffect, useState } from "react";
import { Story } from "@/types/api";
import { getStoryById } from "@/services/stories";

interface Props {
  storyId: string;
}

export default function StoryDetail({ storyId }: Props) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStoryById(storyId)
      .then(setStory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [storyId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!story) return null;

  return (
    <article className="space-y-6">
      <div className="text-sm text-gray-500">@{story.author.username}</div>

      <h1 className="text-3xl font-bold">{story.title}</h1>

      <p className="text-gray-800 whitespace-pre-line">{story.content}</p>

      <div className="text-xs text-gray-400">
        {new Date(story.created_at).toLocaleString()}
      </div>
    </article>
  );
}
