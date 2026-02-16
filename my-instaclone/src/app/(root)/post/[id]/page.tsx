"use client";

import { use } from "react";
import { PostCard } from "@/components/posts/PostCard";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { usePost } from "@/hooks/usePost";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

export default function PostDetailPage({ params }: Props) {
  const { id } = use(params);
  const { post, loading: loadingPost, error: errorPost } = usePost(id);

  if (loadingPost) {
    return <PostSkeleton />;
  }

  if (errorPost || !post) {
    return (
      <ErrorState
        title="Post unavailable"
        description="This post was deleted or is private."
      />
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <PostCard post={post} />
    </main>
  );
}
