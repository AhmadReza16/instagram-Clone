"use client";

export function StoryReplyInput({ storyId }: { storyId: number }) {
  return (
    <input
      placeholder="Send message..."
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 px-4 py-2 rounded-full"
    />
  );
}
