"use client";

import { useToastStore } from "@/store/useToastStore";
import { useEffect } from "react";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    if (!toasts.length) return;

    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white
            ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                  ? "bg-red-500"
                  : "bg-gray-800"
            }
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
