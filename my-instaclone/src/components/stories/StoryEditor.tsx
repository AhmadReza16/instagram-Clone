"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createStory } from "@/services/stories";
import { Upload, X, Type } from "lucide-react";
import Image from "next/image";

export default function StoryEditor() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("media", image);
      if (caption.trim()) {
        formData.append("caption", caption);
      }

      await createStory(formData);

      // Reset form
      setImage(null);
      setPreview(null);
      setCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("Story published successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to publish story");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setCaption("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      {!preview ? (
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-300 font-semibold mb-2">
            Click to upload image
          </p>
          <p className="text-gray-500 text-sm">or drag and drop</p>
          <p className="text-gray-600 text-xs mt-2">PNG, JPG, GIF up to 5MB</p>
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Story preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            onClick={clearImage}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Caption Section */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
          <Type size={16} />
          Add text to your story (Optional)
        </label>
        <Textarea
          placeholder="Write caption or text overlay for your story..."
          rows={4}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={loading || !image}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Publishing..." : "Publish Story"}
        </Button>
        {image && (
          <Button
            onClick={clearImage}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
