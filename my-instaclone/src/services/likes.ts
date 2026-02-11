import { apiClient } from "@/lib/api-client";

// like / unlike (toggle)
export async function toggleLiked(postId: number) {
  const { data } = await apiClient.post(`/likes/toggle/`, {
    post_id: postId,
  });
  return data;
}

// is post liked ?
export async function isPostLiked(postId: number) {
  const { data } = await apiClient.get(`/likes/is-liked/${postId}/`);
  return data;
}

// List of users who liked a post
export async function fetchPostLikes(postId: number) {
  const { data } = await apiClient.get(`/likes/posts/${postId}/likes/`);
  return data;
}


// Posts that a user liked
export async function fetchUserLikedPosts(userId: number) {
  const { data } = await apiClient.get(`/likes/users/${userId}/liked-posts/`);
  return data;
}