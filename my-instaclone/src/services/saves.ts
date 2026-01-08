import { apiClient } from "@/lib/api-client";

export async function savePost(postId: number) {
  const { data } = await apiClient.post(`/posts/${postId}/save/`);
  return data;
}

export async function unsavePost(postId: number) {
  const { data } = await apiClient.delete(`/posts/${postId}/save/`);
  return data;
}