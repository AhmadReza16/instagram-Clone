"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/posts";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select an image");
      return;
    }

    if (caption.trim().length === 0) {
      setError("Please write a caption");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", file);

      await createPost(formData);
      setSuccess(true);

      setTimeout(() => {
        router.replace("/feed");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create post");
      console.error("Create post error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Create new post</h1>
        <p className="text-gray-400 mt-2">Share your moment with the world</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800"
      >
        {/* Image Upload */}
        {preview ? (
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black">
            <Image src={preview} alt="preview" fill className="object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 hover:bg-gray-800/50 transition">
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Upload size={32} className="text-gray-400" />
              <div className="text-center">
                <p className="text-white font-medium">Select a photo</p>
                <p className="text-gray-400 text-sm">or drag and drop</p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
        )}

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Caption
          </label>
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-lg bg-gray-800 text-white p-3 placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">{caption.length}/2200</p>
        </div>

        {/* Requirements */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-sm space-y-2 text-gray-300">
          <p className="font-medium text-white">Requirements:</p>
          <ul className="space-y-1">
            <li>✓ Image is required</li>
            <li>✓ Caption is required</li>
            <li>✓ Supported formats: JPG, PNG, GIF, WebP</li>
          </ul>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 text-sm text-green-400">
            ✓ Post created successfully! Redirecting...
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !file || !caption.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
