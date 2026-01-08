import { apiClient } from "@/lib/api-client";

export async function fetchThreads() {
  const { data } = await apiClient.get("/messages/threads/");
  return data;
}

export async function fetchMessages(threadId: number) {
  const { data } = await apiClient.get(`/messages/threads/${threadId}/`);
  return data;
}

export async function sendMessage(threadId: number, content: string) {
  const { data } = await apiClient.post(`/messages/threads/${threadId}/send/`, { content });
  return data;
}
