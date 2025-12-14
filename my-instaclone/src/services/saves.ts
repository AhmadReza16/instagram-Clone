import { apiClient } from "@/lib/api-client";

export function savePost(postId: number) {
  return apiClient(`/posts/${postId}/save/`, { method: "POST" });
}

export function unsavePost(postId: number) {
  return apiClient(`/posts/${postId}/save/`, { method: "DELETE" });
}