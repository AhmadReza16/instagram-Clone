"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md w-full text-center p-6">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/feed"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Back to Feed
          </Link>

          <Link
            href="/explore"
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
