import { apiClient } from "@/lib/api-client";

export async function fetchComments(postId: number) {
  const { data } = await apiClient.get(`/posts/${postId}/comments/`);
  return data;
}

export async function createComment(postId: number, content: string) {
  const { data } = await apiClient.post(`/posts/${postId}/comments/`, { content });
  return data;
}