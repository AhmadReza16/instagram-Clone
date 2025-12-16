"use client";

import { HighlightItem } from "./HighlightItem";

export function HighlightBar({ highlights, onOpen }: any) {
  return (
    <div className="flex gap-4 mt-6 overflow-x-auto">
      {highlights.map((h: any) => (
        <HighlightItem key={h.id} highlight={h} onClick={() => onOpen(h.id)} />
      ))}
    </div>
  );
}
