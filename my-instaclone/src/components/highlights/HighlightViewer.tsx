"use client";

import { StoryViewer } from "@/components/stories/StoryViewer";
import { useStoryStore } from "@/store/useStoryStore";

interface HighlightViewerProps {
  highlight: {
    id: number;
    stories?: any[];
    [key: string]: any;
  } | null;
  onClose?: () => void;
}

export function HighlightViewer({ highlight, onClose }: HighlightViewerProps) {
  const open = useStoryStore((s) => s.open);

  if (!highlight) return null;

  // Highlight stories → reuse StoryViewer
  open(highlight.stories, 0);

  return <StoryViewer />;
}
