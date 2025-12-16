import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfilePostsGrid } from "@/components/profile/ProfilePostsGrid";
import { useHighlights } from "@/hooks/useHighlights";
import { HighlightBar } from "@/components/highlights/HighlightBar";
import { HighlightViewer } from "@/components/highlights/HighlightViewer";

const { highlights, active, open, close } = useHighlights(profile.username);
export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { profile, loading } = useProfile(params.username);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <ProfileHeader profile={profile} />
      <HighlightBar highlights={highlights} onOpen={open} />
      <HighlightViewer highlight={active} onClose={close} />
      <ProfilePostsGrid posts={profile.posts} />
    </div>
  );
}
