"use client";

import { useState } from "react";
import { savePost, unsavePost } from "@/services/posts";
import { Bookmark } from "lucide-react";

interface Props {
  postId: string;
  initialSaved: boolean;
}

export default function SaveButton({ postId, initialSaved }: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const toggleSave = async () => {
    if (loading) return;

    setLoading(true);
    setSaved(!saved);

    try {
      if (!saved) {
        await savePost(postId);
      } else {
        await unsavePost(postId);
      }
    } catch {
      setSaved(saved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggleSave}>
      <Bookmark className={`w-6 h-6 ${saved ? "fill-black" : ""}`} />
    </button>
  );
}
