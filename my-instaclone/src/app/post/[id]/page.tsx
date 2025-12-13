import StoryDetail from "@/components/stories/StoryDetail";

interface Props {
  params: {
    id: string;
  };
}

export default function StoryDetailPage({ params }: Props) {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <StoryDetail storyId={params.id} />
    </main>
  );
}
