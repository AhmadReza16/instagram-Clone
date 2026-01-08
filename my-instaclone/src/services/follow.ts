import { apiClient } from "@/lib/api-client";

export async function followUser(userId: number) {
  const { data } = await apiClient.post(`/follow/${userId}/`);
  return data;
}

export async function unfollowUser(userId: number) {
  const { data } = await apiClient.delete(`/follow/${userId}/`);
  return data;
}
