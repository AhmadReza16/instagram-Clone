"use client";

import { useState } from "react";
import { savePost, unsavePost } from "@/services/saves";
import { Bookmark } from "lucide-react";

interface Props {
  postId: number;
  initialSaved: boolean;
}

export default function SaveButton({ postId, initialSaved }: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSave = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    const wasSaved = saved;
    setSaved(!saved);

    try {
      if (!saved) {
        await savePost(postId);
      } else {
        await unsavePost(postId);
      }
    } catch (err: any) {
      console.error("Save toggle error:", err);
      setError(err.message || "Failed to toggle save");
      setSaved(wasSaved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggleSave} disabled={loading} title={error || ""}>
      <Bookmark
        className={`w-6 h-6 transition-colors ${
          saved ? "fill-blue-500 text-blue-500" : ""
        } ${error ? "opacity-50" : ""}`}
      />
    </button>
  );
}
