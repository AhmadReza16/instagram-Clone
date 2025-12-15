import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages, me }: any) {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto">
      {messages.map((m: any) => (
        <MessageBubble key={m.id} message={m} isMe={m.sender === me} />
      ))}
    </div>
  );
}
