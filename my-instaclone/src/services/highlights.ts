import { apiClient } from "@/lib/api-client";

export async function fetchHighlights(username: string) {
  const { data } = await apiClient.get(`/stories/highlights/${username}/`);
  return data;
}

export async function fetchHighlightDetail(id: number) {
  const { data } = await apiClient.get(`/stories/highlights/${id}/`);
  return data;
}
