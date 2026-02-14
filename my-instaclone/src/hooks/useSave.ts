"use client";

import { useState } from "react";
import { savePost, unsavePost } from "@/services/saves";

export function useSave(postId: number, initialSaved: boolean) {
  const [saved, setSaved] = useState(initialSaved);

  const toggleSave = async () => {
    const wasSaved = saved;
    setSaved(!saved);

    try {
      saved ? await unsavePost(postId) : await savePost(postId);
    } catch (error) {
      console.error("Failed to toggle save:", error);
      setSaved(wasSaved);
      throw error;
    }
  };

  return { saved, toggleSave };
}
