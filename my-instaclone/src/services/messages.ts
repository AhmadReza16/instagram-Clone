import { apiClient } from "@/lib/api-client";

/* conversations */

export async function fetchThreads() {
  const { data } = await apiClient.get("/messages/conversations/");
  return data;
}

export async function createConversation(userId: number) {
  const { data } = await apiClient.post("/messages/conversations/create/", {
    user_id: userId,
  });
  return data;
}

/* messages */

export async function fetchMessages(conversationId: number) {
  const { data } = await apiClient.get(
    `/messages/conversations/${conversationId}/messages/`
  );
  return data;
}

export async function sendMessage(conversationId: number, content: string) {
  const { data } = await apiClient.post(
    `/messages/conversations/${conversationId}/messages/send/`,
    { content }
  );
  return data;
}

export async function deleteMessage(messageId: number) {
  const { data } = await apiClient.delete(
    `/messages/messages/${messageId}/delete/`
  );
  return data;
}
