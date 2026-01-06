import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import StoryDetail from "@/components/stories/StoryDetail";

interface Props {
  params: {
    id: string;
  };
}

export default function StoryDetailPage({ params }: Props) {
  if (loadingPost) {
    return <PostSkeleton />;
  }
  if (errorPost) {
    return (
      <ErrorState
        title="Post unavailable"
        description="This post was deleted or is private."
      />
    );
  }
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <StoryDetail storyId={params.id} />
    </main>
  );
}
