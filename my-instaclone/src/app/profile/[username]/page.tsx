import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfilePostsGrid } from "@/components/profile/ProfilePostsGrid";

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
      <ProfilePostsGrid posts={profile.posts} />
    </div>
  );
}
