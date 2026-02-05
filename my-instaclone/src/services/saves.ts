import { apiClient } from "@/lib/api-client";

export async function savePost(postId: number) {
  const { data } = await apiClient.post(`/save/${postId}/`);
  return data;
}

export async function unsavePost(postId: number) {
  const { data } = await apiClient.delete(`/unsave/${postId}/`);
  return data;
}