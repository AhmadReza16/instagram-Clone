"use client";

import { useEffect } from "react";
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
  const close = useStoryStore((s) => s.close);

  useEffect(() => {
    if (!highlight) {
      close();
      return;
    }

    // Handle both highlight stories array and single story
    const stories = Array.isArray(highlight.stories)
      ? highlight.stories
      : highlight.stories
        ? [highlight.stories]
        : [highlight]; // If no stories array, treat highlight as a story

    if (stories.length > 0) {
      open(stories, 0);
    }
  }, [highlight, open, close]);

  return <StoryViewer />;
}
