import { apiClient } from "@/lib/api-client";
import { getUserStories } from "./stories";

export async function fetchHighlights(username: string) {
  try {
    const { data } = await apiClient.get(`stories/highlights/${username}/`);
    return data;
  } catch (err) {
    // If highlights endpoint fails, try getting user stories instead
    console.warn("Failed to fetch highlights, trying user stories...");
    return getUserStories(username);
  }
}

export async function deleteHighlight(id: number) {
  const { data } = await apiClient.delete(`stories/highlights/${id}/delete/`);
  return data;
}

export async function createHighlight(formData: FormData) {
  const { data } = await apiClient.post('stories/highlights/create/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Dummy function for backward compatibility - highlight detail is handled by the list
export async function fetchHighlightDetail(id: number) {
  return null;
}
