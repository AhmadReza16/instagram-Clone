"use client";

import { HighlightItem } from "./HighlightItem";

interface Highlight {
  id: number;
  title?: string;
  [key: string]: any;
}

interface HighlightBarProps {
  highlights: Highlight[];
  onOpen: (id: number) => void;
}

export function HighlightBar({ highlights, onOpen }: HighlightBarProps) {
  return (
    <div className="flex gap-4 mt-6 ml-4 overflow-x-auto">
      {highlights.map((h) => (
        <HighlightItem key={h.id} highlight={h} onClick={() => onOpen(h.id)} />
      ))}
    </div>
  );
}
