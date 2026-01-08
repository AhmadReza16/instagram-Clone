import { apiClient } from "@/lib/api-client";

export async function fetchStories() {
  const { data } = await apiClient.get("/stories/");
  return data;
}

export async function markStorySeen(id: number) {
  const { data } = await apiClient.post(`/stories/${id}/seen/`);
  return data;
}

export async function reactToStory(id: number, emoji: string) {
  const { data } = await apiClient.post(`/stories/${id}/react/`, { emoji });
  return data;
}

export async function getStoryById(storyId: string) {
  const { data } = await apiClient.get(`/stories/${storyId}/`);
  return data;
}

export async function getFeedStories() {
  const { data } = await apiClient.get("/stories/feed/");
  return data;
}
