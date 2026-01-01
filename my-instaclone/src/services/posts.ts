import { apiClient } from "@/lib/api-client";

export async function getSavedPosts() {
  const res = await apiClient.get("/posts/saved/");
  return res.data;
}
export async function getPostById(id: string) {
  const res = await apiClient.get(`/posts/${id}/`);
  return res.data;
}

export async function getCommentsByPost(id: string) {
  const res = await apiClient.get(`/posts/${id}/comments/`);
  return res.data;
}
import { apiClient } from "@/lib/api-client";

export async function addComment(
  postId: string,
  content: string
) {
  const res = await apiClient.post(
    `/posts/${postId}/comments/`,
    { content }
  );

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }

  return res.data;
}
import { apiClient } from "@/lib/api-client";

export async function getSavedPosts() {
  const res = await apiClient.get("/posts/saved/");

  if (!res.ok) {
    throw new Error("Failed to fetch saved posts");
  }

  return res.data;
}
