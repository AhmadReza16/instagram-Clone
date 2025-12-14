import { apiClient } from "@/lib/api-client";

export function fetchComments(postId: number) {
  return apiClient(`/posts/${postId}/comments/`);
}

export function createComment(postId: number, content: string) {
  return apiClient(`/posts/${postId}/comments/`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}