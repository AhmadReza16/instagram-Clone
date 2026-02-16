"use client";

import { useStories } from "@/hooks/useStories";
import { StoryCircle } from "./StoryCircle";
import { AddStoryButton } from "./AddStoryButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export function StoryStrip() {
  const { stories, isLoading, isError } = useStories({ type: "feed" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (isError) {
    return (
      <div className="bg-red-900 border border-red-700 rounded-lg p-3 text-sm text-red-200">
        Failed to load stories
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-20 rounded-full bg-gray-800 animate-pulse flex-shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900">
      {/* Stories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
      >
        {/* Add Story Button */}
        <AddStoryButton />

        {/* Stories */}
        {stories.map((story) => (
          <StoryCircle key={story.id} story={story} />
        ))}
      </div>

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
