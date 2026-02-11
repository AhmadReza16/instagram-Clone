"use client";

import { use } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfilePostsGrid } from "@/components/profile/ProfilePostsGrid";
import { useHighlights } from "@/hooks/useHighlights";
import { HighlightBar } from "@/components/highlights/HighlightBar";
import { HighlightViewer } from "@/components/highlights/HighlightViewer";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Unwrap the params Promise using React.use()
  const { username } = use(params);
  const { user: currentUser } = useAuth();

  const {
    profile,
    loading: loadingProfile,
    error: errorProfile,
  } = useProfile(username);
  const { highlights, active, open, close } = useHighlights(username);

  // Check if this is the current user's profile
  const isOwnProfile = currentUser?.username === username;

  if (loadingProfile) {
    return <ProfileSkeleton />;
  }

  if (errorProfile) {
    return (
      <ErrorState
        title="User not found"
        description="This user may not exist or their profile is private."
      />
    );
  }

  if (!profile) {
    return (
      <ErrorState
        title="Profile unavailable"
        description="Unable to load this profile."
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="px-4 md:px-0">
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
      </div>

      {/* Highlights Section */}
      {highlights && highlights.length > 0 && (
        <div className="px-4 md:px-0">
          <HighlightBar highlights={highlights} onOpen={open} />
          <HighlightViewer highlight={active} onClose={close} />
        </div>
      )}

      {/* Posts Grid or Empty State */}
      {!profile.posts || profile.posts.length === 0 ? (
        <div className="mt-12 border-t border-gray-800 pt-12">
          <EmptyState
            title="No posts yet"
            description={
              isOwnProfile
                ? "Share your first post to get started!"
                : "This user hasn't shared any posts yet."
            }
          />
        </div>
      ) : (
        <div className="px-4 md:px-0">
          <ProfilePostsGrid posts={profile.posts} />
        </div>
      )}
    </div>
  );
}
