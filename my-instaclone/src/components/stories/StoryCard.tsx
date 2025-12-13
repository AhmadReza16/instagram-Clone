import { Story } from "@/types/api";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
  return (
    <div className="border rounded-xl p-5 space-y-3 bg-white">
      <div className="text-sm text-gray-500">@{story.author.username}</div>

      <h2 className="text-xl font-semibold">{story.title}</h2>

      <p className="text-gray-700 line-clamp-3">{story.content}</p>

      <div className="text-xs text-gray-400">
        {new Date(story.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
