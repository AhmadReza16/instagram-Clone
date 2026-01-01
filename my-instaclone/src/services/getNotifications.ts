import { apiClient } from "@/lib/api-client";

export async function getNotifications() {
  const res = await apiClient.get("/notifications/");

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.data;
}
