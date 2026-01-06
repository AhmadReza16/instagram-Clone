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

export async function getStoryById(storyId: string) {
  const res = await apiClient.get(`/stories/${storyId}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch story");
  }

  return res.data;
}
export async function getFeedStories() {
  const res = await apiClient.get("/stories/feed/");
  if (!res.ok) {
    throw new Error("Failed to fetch feed stories");
  }
  return res.data;;
}
