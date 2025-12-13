"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createStory } from "@/services/stories";

export default function StoryEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await createStory({ title, content });

      alert("Story published successfully");
      setTitle("");
      setContent("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Story title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Write your story..."
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Publishing..." : "Publish Story"}
      </Button>
    </div>
  );
}
