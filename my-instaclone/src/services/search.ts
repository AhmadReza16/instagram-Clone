import { apiClient } from "@/lib/api-client";

export async function searchAll(query: string) {
  const { data } = await apiClient.get(`/search/`, {
    params: { q: query },
  });
  return data;
}
