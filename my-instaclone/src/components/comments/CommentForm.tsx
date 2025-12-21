"use client";

import { useState } from "react";
import { addComment } from "@/services/posts";

interface Props {
  postId: string;
  onAddOptimistic: (comment: any) => void;
  onRollback: (tempId: string) => void;
}

export default function CommentForm({
  postId,
  onAddOptimistic,
  onRollback,
}: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!content.trim() || loading) return;

    const tempId = `temp-${Date.now()}`;

    const optimisticComment = {
      id: tempId,
      content,
      user: { username: "you" },
      created_at: new Date().toISOString(),
      isOptimistic: true,
    };

    onAddOptimistic(optimisticComment);
    setContent("");
    setLoading(true);

    try {
      const realComment = await addComment(postId, content);
      onRollback(tempId);
      onAddOptimistic(realComment);
    } catch {
      onRollback(tempId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border rounded px-2"
        placeholder="Add a comment..."
      />
      <button onClick={submit} disabled={loading}>
        Post
      </button>
    </div>
  );
}
