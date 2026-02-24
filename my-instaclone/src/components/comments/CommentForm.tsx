"use client";

import { useState } from "react";
import { createComment } from "@/services/comments";

interface Comment {
  id: number | string;
  content?: string;
  text?: string;
  user?: {
    username: string;
    avatar?: string;
    profile_image?: string;
  } | null;
  created_at: string;
}

interface Props {
  postId: number;
  setComments: (comment: Comment) => void;
}

export default function CommentForm({ postId, setComments }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!content.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const newComment = await createComment(postId, content);

      // Validate response has required fields
      if (!newComment || typeof newComment.id === "undefined") {
        throw new Error("Invalid response from server");
      }

      // Ensure user object exists with required fields
      if (!newComment.user || typeof newComment.user !== "object") {
        newComment.user = {
          username: "Unknown",
          avatar: undefined,
          profile_image: undefined,
        };
      } else {
        // Ensure all user fields exist
        newComment.user = {
          username: newComment.user.username || "Unknown",
          avatar: newComment.user.avatar || undefined,
          profile_image: newComment.user.profile_image || undefined,
        };
      }

      setComments(newComment);
      setContent("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="mt-3">
      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-1 bg-gray-200 border border-gray-800 rounded px-3 py-2 text-gray-800 text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700"
          placeholder="Add a comment..."
        />
        <button
          onClick={submit}
          disabled={loading || !content.trim()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm rounded transition"
        >
          {loading ? "..." : "Comment"}
        </button>
      </div>
    </div>
  );
}
