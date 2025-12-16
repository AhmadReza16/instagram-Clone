import { apiClient } from "@/lib/api-client";

export function searchAll(query: string) {
  return apiClient(`/search/?q=${encodeURIComponent(query)}`);
}
