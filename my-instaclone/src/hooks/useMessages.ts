"use client";

import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "@/services/messages";

export function useMessages(threadId: number) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!threadId) return;
    
    setLoading(true);
    setError(null);
    fetchMessages(threadId)
      .then(setMessages)
      .catch((err) => setError(err.message || "Failed to fetch messages"))
      .finally(() => setLoading(false));
  }, [threadId]);

  const send = async (content: string) => {
    try {
      const msg = await sendMessage(threadId, content);
      setMessages((prev) => [...prev, msg]);
    } catch (err: any) {
      setError(err.message || "Failed to send message");
      throw err;
    }
  };

  return { messages, send, loading, error };
}
