export function MessageBubble({ message, isMe }: any) {
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-lg ${
        isMe ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {message.content}
    </div>
  );
}
