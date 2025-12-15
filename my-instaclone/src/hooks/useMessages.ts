"use client";

import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "@/services/messages";

export function useMessages(threadId: number) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages(threadId).then(setMessages:);
  }, [threadId]);

  const send = async (content: string) => {
    const msg = await sendMessage(threadId, content);
    setMessages((prev) => [...prev, msg]);
  };

  return { messages, send };
}
