"use client";

import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PostComments({ postId }: { postId: number }) {
  const { comments, addComment } = useComments(postId);
  const [content, setContent] = useState("");

  return (
    <div className="space-y-2">
      {comments.map((c) => (
        <p key={c.id}>
          <strong>{c.user.username}</strong> {c.content}
        </p>
      ))}

      <div className="flex gap-2">
        <Input
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={() => {
            addComment(content);
            setContent("");
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
