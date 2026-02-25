import { apiClient } from "@/lib/api-client";

// create story
export async function createStory(formData: FormData) {
  const { data } = await apiClient.post("stories/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// Get single story by id
export async function getStoryById(storyId: number) {
  const { data } = await apiClient.get(`stories/story/${storyId}/`);
  return data;
}

// Delete story
export async function deleteStory(storyId: number) {
  const { data } = await apiClient.delete(`stories/story/${storyId}/delete/`);
  return data;
}

// Feed - get all stories from followed users
export async function getFeedStories() {
  const { data } = await apiClient.get("stories/feed/");
  return data;
}

// Get current user's own stories
export async function getMyStories() {
  const { data } = await apiClient.get("stories/my-stories/");
  return data;
}

// Mark story as seen/viewed
export async function SeenStory(storyId: number) {
  const { data } = await apiClient.post(`stories/story/${storyId}/seen/`);
  return data;
}

// add mention in story
export async function mentionStory(storyId: number, userId: number) {
  const { data } = await apiClient.post(`stories/${storyId}/mention/`, {
    user_id: userId,
  });
  return data;
}

// Add reaction (emoji) to story
export async function reactToStory(storyId: number, emoji: string) {
  const { data } = await apiClient.post(`stories/${storyId}/react/`, { emoji });
  return data;
}

// Highlights
export async function createHighlight(formData: FormData) {
  const { data } = await apiClient.post("stories/highlight/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// Get stories of a specific user (for profile highlights)
export async function getUserStories(username: string) {
  const { data } = await apiClient.get(`stories/user/${username}/`);
  return data;
}

export async function addStoryToHighlight(
  highlightId: number,
  storyId: number
) {
  const { data } = await apiClient.post(
    `stories/highlight/${highlightId}/${storyId}/add/`
  );
  return data;
}

export async function removeStoryFromHighlight(
  highlightId: number,
  storyId: number
) {
  const { data } = await apiClient.post(
    `stories/highlight/${highlightId}/${storyId}/remove/`
  );
  return data;
}

export async function fetchHighlights(username: string) {
  const { data } = await apiClient.get(`stories/highlights/${username}/`);
  return data;
}
