import { apiClient } from "@/lib/api-client";

export async function fetchHighlights(username: string) {
  const { data } = await apiClient.get(`stories/highlights/${username}/`);
  return data;
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
