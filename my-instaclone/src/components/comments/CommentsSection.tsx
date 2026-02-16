"use client";

import { useEffect, useState } from "react";
import { CommentItem } from "./CommentItem";
import CommentForm from "./CommentForm";

interface Comment {
  id: number;
  content: string;
  user: {
    username: string;
  };
  created_at: string;
}

export default function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments/`,
      );

      const data = await res.json();
      setComments(data);
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  if (loading) return <p className="text-sm mt-2">Loading...</p>;

  return (
    <div className="mt-3 space-y-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      <CommentForm postId={postId} setComments={setComments} />
    </div>
  );
}
