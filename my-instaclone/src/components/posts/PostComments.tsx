"use client";

import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PostComments({ postId }: { postId: number }) {
  const { comments, addComment, loading, error } = useComments(postId);
  const [content, setContent] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddComment = async () => {
    if (!content.trim()) return;

    setIsAdding(true);
    setAddError(null);

    try {
      await addComment(content);
      setContent("");
    } catch (err: any) {
      setAddError(err.message || "Failed to add comment");
      console.error("Add comment error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-sm">Failed to load comments</div>;
  }

  return (
    <div className="space-y-2">
      {comments.map((c) => (
        <p key={c.id} className="text-sm">
          <strong>{c.user.username}</strong> {c.content}
        </p>
      ))}

      {addError && <div className="text-red-500 text-xs">{addError}</div>}

      <div className="flex gap-2 pt-2">
        <Input
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isAdding}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
          }}
        />
        <Button
          onClick={handleAddComment}
          disabled={isAdding || !content.trim()}
          size="sm"
        >
          {isAdding ? "..." : "Post"}
        </Button>
      </div>
    </div>
  );
}
