"use client";

import { StoryViewer } from "@/components/stories/StoryViewer";
import { useStoryStore } from "@/store/useStoryStore";

export function HighlightViewer({ highlight, onClose }: any) {
  const open = useStoryStore((s) => s.open);

  if (!highlight) return null;

  // Highlight stories → reuse StoryViewer
  open(highlight.stories, 0);

  return <StoryViewer />;
}
