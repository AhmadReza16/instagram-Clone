import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfilePostsGrid } from "@/components/profile/ProfilePostsGrid";
import { useHighlights } from "@/hooks/useHighlights";
import { HighlightBar } from "@/components/highlights/HighlightBar";
import { HighlightViewer } from "@/components/highlights/HighlightViewer";
import { profile } from "console";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";
import { EmptyState } from "@/components/states/EmptyState";

const { highlights, active, open, close } = useHighlights(profile.username);
export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { profile, loading } = useProfile(params.username);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found</p>;
  if (loadingProfile) {
    return <ProfileSkeleton />;
  }
  <EmptyState
    title="No posts yet"
    description="When this user posts, you’ll see it here."
  />;
  if (errorProfile) {
    return (
      <ErrorState
        title="Profile not found"
        description="This user may not exist or is private."
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
