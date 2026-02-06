export function ProfileStats({ profile }: { profile: any }) {
  const stats = [
    { label: "posts", value: profile.posts_count || 0 },
    { label: "followers", value: profile.followers_count || 0 },
    { label: "following", value: profile.following_count || 0 },
  ];

  return (
    <div className="flex gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="font-semibold text-white text-xl">
            {stat.value.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
