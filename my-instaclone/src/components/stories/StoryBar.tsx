"use client";

import { useEffect, useState } from "react";
import { fetchStories } from "@/services/stories";
import { StoryAvatar } from "./StoryAvatar";
import { useStoryStore } from "@/store/useStoryStore";

export function StoryBar() {
  const [stories, setStories] = useState<any[]>([]);
  const open = useStoryStore((s) => s.open);

  useEffect(() => {
    fetchStories().then(setStories);
  }, []);

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
