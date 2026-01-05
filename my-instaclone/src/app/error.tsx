"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, you can send this to Sentry / LogRocket
    console.error("Global error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md w-full text-center p-6">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-6">
          An unexpected error occurred. You can try again or return to the feed.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Try again
          </button>

          <Link
            href="/feed"
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
          >
            Go to Feed
          </Link>
        </div>
      </div>
    </main>
  );
}
