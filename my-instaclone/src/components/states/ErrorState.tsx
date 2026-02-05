"use client";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="text-5xl">⚠️</div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-muted-foreground max-w-md">{description}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
