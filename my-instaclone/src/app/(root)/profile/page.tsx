"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfilePostsGrid } from "@/components/profile/ProfilePostsGrid";
import { FeedSkeleton } from "@/components/skeletons/FeedSkeleton";
import { EmptyState } from "@/components/states/EmptyState";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Get current user from localStorage or API
        const token = localStorage.getItem("access");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        // Fetch current user profile
        // You can replace this with your actual API call
        // For now, we'll show a placeholder
        setProfile({
          id: 1,
          username: "current_user",
          bio: "Your bio here",
          profile_picture: null,
          followers_count: 0,
          following_count: 0,
          posts: [],
        });
        setError(false);
      } catch (err) {
        setError(true);
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) return <FeedSkeleton />;

  if (error) {
    return (
      <EmptyState
        title="Failed to load profile"
        description="Please try again later"
      />
    );
  }

  if (!profile) {
    return (
      <EmptyState
        title="Profile not found"
        description="Please log in to view your profile"
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <ProfileHeader profile={profile} />

      {/* Stats Section */}
      <ProfileStats profile={profile} />

      {/* Posts Grid */}
      {profile.posts && profile.posts.length > 0 ? (
        <ProfilePostsGrid posts={profile.posts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts yet</p>
        </div>
      )}
    </div>
  );
}
