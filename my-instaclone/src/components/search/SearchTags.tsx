interface Tag {
  name: string;
  posts_count: number;
}

interface SearchTagsProps {
  tags: Tag[];
}

export function SearchTags({ tags }: SearchTagsProps) {
  return (
    <div className="space-y-3 mt-4">
      {tags.map((t) => (
        <div key={t.name}>
          <p className="font-medium">#{t.name}</p>
          <p className="text-sm text-gray-500">{t.posts_count} posts</p>
        </div>
      ))}
    </div>
  );
}
