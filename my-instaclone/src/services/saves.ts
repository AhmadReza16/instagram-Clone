import { apiClient } from "@/lib/api-client";

export async function savePost(postId: number) {
  const { data } = await apiClient.post(`/saved/save/${postId}/`);
  return data;
}

export async function unsavePost(postId: number) {
  const { data } = await apiClient.delete(`/saved/unsave/${postId}/`);
  return data;
}

export async function savePostlist() {
  const { data } = await apiClient.get(`/saved/list/`);
  return data;
}