import StoryFeed from "@/components/stories/StoryFeed";

export default function FeedPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>
      <StoryFeed />
    </main>
  );
}
