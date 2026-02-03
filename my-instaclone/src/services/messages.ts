import { apiClient } from "@/lib/api-client";

export async function fetchThreads() {
  const { data } = await apiClient.get("/messages/conversations/");
  return data;
}

export async function fetchMessages(threadId: number) {
  const { data } = await apiClient.get(`/messages/conversations/${threadId}/`);
  return data;
}

export async function sendMessage(threadId: number, content: string) {
  const { data } = await apiClient.post(`/messages/conversations/${threadId}/send/`, { content });
  return data;
}
