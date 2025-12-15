import { apiClient } from "@/lib/api-client";

export function fetchStories() {
  return apiClient("/stories/");
}

export function markStorySeen(id: number) {
  return apiClient(`/stories/${id}/seen/`, { method: "POST" });
}

export function reactToStory(id: number, emoji: string) {
  return apiClient(`/stories/${id}/react/`, {
    method: "POST",
    body: JSON.stringify({ emoji }),
  });
}
