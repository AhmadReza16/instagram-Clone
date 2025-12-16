export function SearchTags({ tags }: any) {
  return (
    <div className="space-y-3 mt-4">
      {tags.map((t: any) => (
        <div key={t.name}>
          <p className="font-medium">#{t.name}</p>
          <p className="text-sm text-gray-500">{t.posts_count} posts</p>
        </div>
      ))}
    </div>
  );
}
