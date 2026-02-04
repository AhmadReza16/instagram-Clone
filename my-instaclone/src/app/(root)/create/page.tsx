"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/posts";

export default function CreatePostPage() {
  const router = useRouter();

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", file);

      await createPost(formData);
      router.replace("/feed");
    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 p-4">
      <h1 className="text-xl font-semibold">Create new post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm"
          required
        />

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full rounded bg-zinc-900 p-3 outline-none"
          rows={4}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-green-600 ml-8 px-6 py-2 disabled:opacity-50"
        >
          {loading ? "Posting..." : "post"}
        </button>
      </form>
    </div>
  );
}
