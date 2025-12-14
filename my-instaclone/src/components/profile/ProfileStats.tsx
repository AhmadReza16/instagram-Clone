export function ProfileStats({ profile }: { profile: any }) {
  return (
    <div className="flex gap-6 text-sm">
      <span>
        <strong>{profile.posts_count}</strong> posts
      </span>
      <span>
        <strong>{profile.followers_count}</strong> followers
      </span>
      <span>
        <strong>{profile.following_count}</strong> following
      </span>
    </div>
  );
}
