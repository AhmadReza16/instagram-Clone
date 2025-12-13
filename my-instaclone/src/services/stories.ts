import { apiClient } from "@/lib/api-client";
import { CreateStoryPayload, Story } from "@/types/api";

export function createStory(payload: CreateStoryPayload) {
  return apiClient<Story>("/stories/", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}

export function getStories() {
  return apiClient<Story[]>("/stories/", {
    method: "GET",
    auth: true,
  });
}

export function getStoryById(id: string) {
  return apiClient<Story>(`/stories/${id}/`, {
    method: "GET",
    auth: true,
  });
}
