import { apiClient } from "@/lib/api-client";

// create story
export async function createStory(formData: FormData) {
  const { data } = await apiClient.post("/stories/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// add mention in story
export async function mentionStory(storyId: number, userId: number) {
  const { data } = await apiClient.post(`/stories/${storyId}/mention/`, { user_id: userId });
  return data;
}

export async function reactToStory(id: number, emoji: string) {
  const { data } = await apiClient.post(`/stories/${id}/react/`, { emoji });
  return data;
}

// Highlights
export async function createHighlight(formData: FormData) {
  const { data } = await apiClient.post("/stories/highlight/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function addStoryToHighlight(highlightId: number, storyId: number) {
  const { data } = await apiClient.post(`/stories/highlight/${highlightId}/${storyId}/add/`);
  return data;
}

export async function removeStoryFromHighlight(highlightId: number, storyId: number) {
  const { data } = await apiClient.post(`/stories/highlight/${highlightId}/${storyId}/remove/`);
  return data;
}

export async function fetchHighlights(username: string) {
  const { data } = await apiClient.get(`/stories/highlights/${username}/`);
  return data;
}

export async function SeenStory(id: number) {
  const { data } = await apiClient.post(`/stories/${id}/seen/`);
  return data;
}


export async function getStoryById(storyId: number) {
  const { data } = await apiClient.get(`/stories/${storyId}/`);
  return data;
}

// Feed 
export async function getFeedStories() {
  const { data } = await apiClient.get("/stories/feed/");
  return data;
}
