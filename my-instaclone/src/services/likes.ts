import { apiClient } from "@/lib/api-client";

export async function likePost(postId: number) {
  const { data } = await apiClient.post(`/posts/${postId}/like/`);
  return data;
}

export async function unlikePost(postId: number) {
  const { data } = await apiClient.delete(`/posts/${postId}/like/`);
  return data;
}