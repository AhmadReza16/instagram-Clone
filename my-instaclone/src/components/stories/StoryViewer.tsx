"use client";

import Image from "next/image";
import { useStoryStore } from "@/store/useStoryStore";
import { StoryProgress } from "./StoryProgress";
import { StoryReactions } from "./StoryReactions";
import { StoryReplyInput } from "./StoryReplyInput";

export function StoryViewer() {
  const { stories, activeIndex, isOpen, close, next, prev } = useStoryStore();

  if (!isOpen) return null;

  const story = stories[activeIndex];

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <StoryProgress />

      <button className="absolute left-0 w-1/3 h-full" onClick={prev} />
      <button className="absolute right-0 w-1/3 h-full" onClick={next} />

      <Image src={story.media} alt="" fill className="object-contain" />

      <StoryReactions storyId={story.id} />
      <StoryReplyInput storyId={story.id} />

      <button
        onClick={close}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>
    </div>
  );
}
