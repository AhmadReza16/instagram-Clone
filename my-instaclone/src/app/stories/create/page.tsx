"use client";

import StoryEditor from "@/components/stories/StoryEditor";

export default function CreateStoryPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Create Story</h1>
      <StoryEditor />
    </main>
  );
}
