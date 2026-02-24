"use client";

import { useState, useEffect } from "react";
import { savePost, unsavePost, isPostSaved } from "@/services/saves";

export function useSave(postId: number, initialSaved: boolean = false) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check initial saved state when component mounts
  useEffect(() => {
    const checkSaved = async () => {
      try {
        setChecking(true);
        const isSaved = await isPostSaved(postId);
        setSaved(isSaved);
      } catch (error) {
        console.error("Failed to check saved status:", error);
      } finally {
        setChecking(false);
      }
    };

    checkSaved();
  }, [postId]);

  const toggleSave = async () => {
    if (loading || checking) return;

    const wasSaved = saved;
    setLoading(true);

    try {
      setSaved(!saved);
      saved ? await unsavePost(postId) : await savePost(postId);
    } catch (error) {
      console.error("Failed to toggle save:", error);
      setSaved(wasSaved);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { saved, toggleSave, loading: loading || checking };
}
