import { apiClient } from "@/lib/api-client";

// Get a list of notifications
export async function fetchNotifications() {
  const { data } = await apiClient.get(`/notifications/`);
  return data;
}

// Number of unread notifications
export async function fetchUnreadNotificationsCount() {
  const { data } = await apiClient.get(`/notifications/unread-count/`);
  return data;
}

// All notifications read
export async function markAllNotificationsRead() {
  const { data } = await apiClient.post(`/notifications/mark-read/`);
  return data;
}

//  Reading a specific notification
export async function markNotificationRead(notificationId: number) {
  const { data } = await apiClient.post(
    `/notifications/${notificationId}/mark-read/`
  );
  return data;
}

// Delete Notifications
export async function deleteNotification(notificationId: number) {
  const { data } = await apiClient.delete(`/notifications/${notificationId}/`);
  return data;
}
