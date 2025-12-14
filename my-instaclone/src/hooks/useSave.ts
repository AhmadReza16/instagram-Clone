"use client";

import { useState } from "react";
import { savePost, unsavePost } from "@/services/saves";

export function useSave(postId: number, initialSaved: boolean) {
  const [saved, setSaved] = useState(initialSaved);

  const toggleSave = async () => {
    setSaved(!saved);

    try {
      saved ? await unsavePost(postId) : await savePost(postId);
    } catch {
      setSaved(saved);
    }
  };

  return { saved, toggleSave };
}
