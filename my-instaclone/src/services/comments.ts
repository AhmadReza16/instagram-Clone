import { apiClient } from "@/lib/api-client";


/* list & create */

export async function fetchComments(postId: number) {
  const { data } = await apiClient.get(
    `/comments/posts/${postId}/`
  );
  return data;
}

export async function createComment(postId: number, content: string) {
  const { data } = await apiClient.post(
    `/comments/posts/${postId}/`,
    { content }
  );
  return data;
}

/* detail */

export async function updateComment(commentId: number, content: string) {
  const { data } = await apiClient.put(
    `/comments/${commentId}/`,
    { content }
  );
  return data;
}

export async function deleteComment(commentId: number) {
  await apiClient.delete(`/comments/${commentId}/`);
}