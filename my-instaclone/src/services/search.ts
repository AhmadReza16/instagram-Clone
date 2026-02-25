import { apiClient } from "@/lib/api-client";

export async function searchUsers(query: string) {
  const { data } = await apiClient.get(`search/users/`, {
    params: { q: query },
  });
  return data;
}

export async function searchPosts(query: string) {
  const { data } = await apiClient.get(`search/posts/`, {
    params: { q: query },
  });
  return data;
}

export async function getSuggestedPosts() {
  const { data } = await apiClient.get(`posts/suggested/`);
  return data;
}

// Get all posts for Explore page
export async function getAllPosts() {
  try {
    const { data } = await apiClient.get(`posts/explore/`);
    console.log("getAllPosts response:", data);
    // Handle both array and paginated formats
    return Array.isArray(data) ? data : data?.results || data?.data || [];
  } catch (err) {
    console.error("getAllPosts error:", err);
    throw err;
  }
}
