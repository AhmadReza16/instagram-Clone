"use client";

import { useEffect, useState } from "react";
import { CommentItem } from "./CommentItem";
import CommentForm from "./CommentForm";
import { apiClient } from "@/lib/api-client";

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

export default function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);

        // استفاده از endpoint درست (بدون slash شروع)
        const { data } = await apiClient.get(`comments/posts/${postId}/`);

        // Handle both array and paginated responses
        if (Array.isArray(data)) {
          setComments(data);
        } else if (data?.results && Array.isArray(data.results)) {
          setComments(data.results);
        } else {
          setComments([]);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setError("Unable to load comments");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (error) return <p className="text-sm text-red-500 mt-2">{error}</p>;
  if (loading) return <p className="text-sm mt-2">Loading...</p>;

  return (
    <div className="mt-3 space-y-2">
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet</p>
      ) : (
        comments.map((comment) => {
          // Ensure comment has valid id for key
          if (!comment || !comment.id) {
            return null;
          }
          return <CommentItem key={comment.id} comment={comment} />;
        })
      )}

      <CommentForm postId={postId} setComments={handleAddComment} />
    </div>
  );
}
