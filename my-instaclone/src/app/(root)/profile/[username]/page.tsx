"use client";

import { useProfile } from "@/hooks/useProfile";
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
  params: { username: string };
}) {
  const {
    profile,
    loading: loadingProfile,
    error: errorProfile,
  } = useProfile(params.username);
  const { highlights, active, open, close } = useHighlights(params.username);

  if (loadingProfile) {
    return <ProfileSkeleton />;
  }

  if (errorProfile) {
    return (
      <ErrorState
        title="Profile not found"
        description="This user may not exist or is private."
      />
    );
  }

  if (!profile || !profile.posts || profile.posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="When this user posts, you'll see it here."
      />
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4">
      <ProfileHeader profile={profile} />
      <HighlightBar highlights={highlights} onOpen={open} />
      <HighlightViewer highlight={active} onClose={close} />
      <ProfilePostsGrid posts={profile.posts} />
    </div>
  );
}
