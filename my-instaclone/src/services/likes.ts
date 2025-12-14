import { apiClient } from "@/lib/api-client";

export function likePost(postId: number) {
  return apiClient(`/posts/${postId}/like/`, { method: "POST" });
}

export function unlikePost(postId: number) {
  return apiClient(`/posts/${postId}/like/`, { method: "DELETE" });
}