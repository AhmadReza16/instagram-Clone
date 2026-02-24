import { apiClient } from "@/lib/api-client";

export async function savePost(postId: number) {
  const { data } = await apiClient.post(`saved/save/${postId}/`);
  return data;
}

export async function unsavePost(postId: number) {
  const { data } = await apiClient.delete(`saved/unsave/${postId}/`);
  return data;
}

export async function getSavedPostsList() {
  const { data } = await apiClient.get(`saved/list/`);
  // Flatten nested post objects from the API response
  if (Array.isArray(data)) {
    return data.map((item: any) => item.post || item);
  }
  return data;
}

// Check if post is saved
export async function isPostSaved(postId: number) {
  try {
    const savedPosts = await getSavedPostsList();
    if (Array.isArray(savedPosts)) {
      return savedPosts.some((post: any) => post.id === postId);
    }
    return false;
  } catch (error) {
    console.error("Failed to check if post is saved:", error);
    return false;
  }
}