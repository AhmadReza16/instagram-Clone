import { apiClient } from "@/lib/api-client";

export async function getNotifications() {
  const { data } = await apiClient.get("/notifications/");
  return data;
}
