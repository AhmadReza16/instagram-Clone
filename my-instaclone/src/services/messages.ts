import { apiClient } from "@/lib/api-client";

export function fetchThreads() {
  return apiClient("/messages/threads/");
}

export function fetchMessages(threadId: number) {
  return apiClient(`/messages/threads/${threadId}/`);
}

export function sendMessage(threadId: number, content: string) {
  return apiClient(`/messages/threads/${threadId}/send/`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}
