"use client";

import { use } from "react";
import { useMessages } from "@/hooks/useMessages";
import { MessageList } from "@/components/messages/MessageList";
import { MessageInput } from "@/components/messages/MessageInput";

export default function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = use(params);
  const { messages, send } = useMessages(Number(threadId));
  const me = "me"; // از auth میاد بعداً

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} me={me} />
      <MessageInput onSend={send} />
    </div>
  );
}
