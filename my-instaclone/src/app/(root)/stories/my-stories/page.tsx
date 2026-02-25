"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyStories, deleteStory } from "@/services/stories";
import { getImageUrl } from "@/lib/image-url";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import MyStoryPreview from "@/components/stories/MyStoryPreview";

interface MyStory {
  id: number;
  media: string;
  caption?: string;
  created_at: string;
  expires_at: string;
  views?: any[];
  owner: {
    username: string;
  };
}

export default function MyStoriesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [stories, setStories] = useState<MyStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        setLoading(true);
        // Fetch current user's stories directly from the new endpoint
        const response = await getMyStories();
        console.log("getMyStories response:", response);

        // Handle both array and paginated response formats
        const allStories = Array.isArray(response)
          ? response
          : response?.results || response?.data || [];

        console.log("Parsed stories:", allStories);
        setStories(allStories);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching stories:", err);
        setError(err.message || "Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    if (user?.username) {
      fetchMyStories();
    }
  }, [user?.username]);

  const handleDelete = async (storyId: number) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      setDeleting(storyId);
      await deleteStory(storyId);
      // Remove from local state
      setStories(stories.filter((s) => s.id !== storyId));
      setDeleting(null);
    } catch (err: any) {
      console.error("Failed to delete story:", err);
      alert("Failed to delete story");
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <p className="text-gray-400">Loading your stories...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-100">My Stories</h1>
      </div>

      {/* Story Preview - Show at top */}
      {!loading && stories.length > 0 && (
        <div className="mb-8 pb-8 border-b border-gray-800">
          <p className="text-gray-400 text-sm mb-4">
            Click to view your stories
          </p>
          <MyStoryPreview stories={stories} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-100">
            No stories yet
          </h2>
          <p className="text-gray-400 max-w-md">
            Create your first story to share with your followers!
          </p>
          <Link
            href="/stories/create"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Create Story
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats */}
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total Stories</p>
                <p className="text-white text-3xl font-bold">
                  {stories.length}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-white text-3xl font-bold">
                  {stories.reduce((sum, s) => sum + (s.views?.length || 0), 0)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Views</p>
                <p className="text-white text-3xl font-bold">
                  {Math.round(
                    stories.reduce(
                      (sum, s) => sum + (s.views?.length || 0),
                      0,
                    ) / stories.length || 0,
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => {
              const mediaUrl = getImageUrl(story.media) || "/placeholder.png";
              const isExpired = new Date(story.expires_at) < new Date();

              return (
                <div
                  key={story.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:border-gray-700 border border-gray-800 transition-colors"
                >
                  {/* Story Image */}
                  <div className="relative w-full aspect-video bg-gray-800 overflow-hidden">
                    <Image
                      src={mediaUrl}
                      alt="Story"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {isExpired && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-gray-300 text-sm">Expired</span>
                      </div>
                    )}
                  </div>

                  {/* Story Info */}
                  <div className="p-4 space-y-3">
                    {/* Caption */}
                    {story.caption && (
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {story.caption}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatDate(story.created_at)}</span>
                      {!isExpired && <span className="text-green-400">•</span>}
                      {!isExpired && (
                        <span className="text-green-400">Active</span>
                      )}
                    </div>

                    {/* Views */}
                    {!isExpired && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Eye size={16} />
                        <span>{story.views?.length || 0} views</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/stories/${story.id}`}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors text-sm font-semibold"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(story.id)}
                        disabled={deleting === story.id || isExpired}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 rounded transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
