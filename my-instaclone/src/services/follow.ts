import { apiClient } from "@/lib/api-client";

export function followUser(userId: number) {
  return apiClient(`/follow/${userId}/`, { method: "POST" });
}

export function unfollowUser(userId: number) {
  return apiClient(`/follow/${userId}/`, { method: "DELETE" });
}
