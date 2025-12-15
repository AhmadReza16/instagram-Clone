"use client";

import { useEffect, useState } from "react";
import { useStoryStore } from "@/store/useStoryStore";

export function StoryProgress() {
  const [progress, setProgress] = useState(0);
  const next = useStoryStore((s) => s.next);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
      <div
        className="h-full bg-white transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
