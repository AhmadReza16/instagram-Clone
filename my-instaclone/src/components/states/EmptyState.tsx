"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      {icon && <div className="text-5xl">{icon}</div>}

      <h2 className="text-xl font-semibold">{title}</h2>

      {description && (
        <p className="text-muted-foreground max-w-md">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
