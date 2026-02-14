"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "@/services/notifications";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";

interface Notification {
  id: number;
  actor: {
    username: string;
  };
  verb: string;
  target_url?: string;
  created_at: string;
}

export default function NotificationsPage() {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchNotifications();
      // Handle response - might be array or object with results key
      const notifications = Array.isArray(res)
        ? res
        : res?.results || res?.data || [];
      setData(notifications as Notification[]);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <ErrorState title="Failed to load notifications" onRetry={fetchData} />
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No notifications yet"
        description="You’re all caught up 🎉"
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto py-6 space-y-2">
      {data.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}
