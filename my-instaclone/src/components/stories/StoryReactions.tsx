"use client";

import { reactToStory } from "@/services/stories";

const emojis = ["❤️", "😂", "🔥"];

export function StoryReactions({ storyId }: { storyId: number }) {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => reactToStory(storyId, emoji)}
          className="text-2xl"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
