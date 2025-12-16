import { apiClient } from "@/lib/api-client";

export function fetchHighlights(username: string) {
  return apiClient(`/stories/highlights/${username}/`);
}

export function fetchHighlightDetail(id: number) {
  return apiClient(`/stories/highlights/${id}/`);
}
