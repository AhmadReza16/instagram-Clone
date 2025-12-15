"use client";

import { useState } from "react";

export function MessageInput({ onSend }: { onSend: any }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex p-2 border-t">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2"
        placeholder="Message..."
      />
      <button onClick={submit} className="px-4">
        Send
      </button>
    </div>
  );
}
