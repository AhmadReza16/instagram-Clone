"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostById, getCommentsByPost } from "@/services/posts";
import { PostCard } from "@/components/posts/PostCard";
import { CommentItem } from "@/components/comments/CommentItem";
import { CommentForm } from "@/components/comments/CommentForm";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";

export default function CommentsPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const postData = await getPostById(id as string);
      const commentsData = await getCommentsByPost(id as string);
      setPost(postData);
      setComments(commentsData);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <PostSkeleton />;

  if (error) {
    return (
      <ErrorState
        title="Failed to load comments"
        description="Please try again later."
        onRetry={fetchData}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto py-6 space-y-6">
      <PostCard post={post} />

      {comments.length === 0 ? (
        <EmptyState
          title="No comments yet"
          description="Be the first to comment on this post."
        />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      <CommentForm postId={id as string} onSuccess={fetchData} />
    </div>
  );
}
