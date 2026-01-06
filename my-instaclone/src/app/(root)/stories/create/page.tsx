"use client";

import { useAuth } from "@/hooks/useAuth";
import StoryEditor from "@/components/stories/StoryEditor";
import { StorySkeleton } from "@/components/skeletons/StorySkeleton";

export default function CreateStoryPage() {
  useAuth();

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Create Story</h1>
      {loadingStories ? <StorySkeleton /> : <StoryEditor />}
    </main>
  );
}
