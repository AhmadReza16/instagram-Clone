import { apiClient } from "@/lib/api-client";

export async function searchUsers(query: string) {
  const { data } = await apiClient.get(`/search/users/`, {
    params: { q: query },
  });
  return data;
}
export async function searchPosts(query: string) {
  const { data } = await apiClient.get(`/search/posts/`, {
    params: { q: query },
  });
  return data;
}
