"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStoryById, SeenStory, reactToStory } from "@/services/stories";
import { getImageUrl } from "@/lib/image-url";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, MessageCircle, Share2, Smile } from "lucide-react";
import { useRouter } from "next/navigation";

const EMOJI_REACTIONS = ["❤️", "🔥", "😂", "😮", "😢", "👏"];

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = Number(params.id);

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [reacting, setReacting] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const data = await getStoryById(storyId);
        setStory(data);

        // Mark as seen
        await SeenStory(storyId).catch(() => {
          // Silently fail if already seen
        });
      } catch (err: any) {
        setError(err.message || "Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  const handleReaction = async (emoji: string) => {
    if (reacting) return;

    try {
      setReacting(true);
      await reactToStory(storyId, emoji);
      setShowReactions(false);
      // Could update UI to show reaction was added
    } catch (err) {
      console.error("Failed to add reaction:", err);
    } finally {
      setReacting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-96 h-96 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">
          {error || "Story not found"}
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    );
  }

  const mediaUrl = getImageUrl(story.media) || "/placeholder.png";
  const avatarUrl =
    getImageUrl(story.owner?.profile_image || story.owner?.avatar) ||
    "/avatar.png";
  const isExpired = new Date(story.expires_at) < new Date();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="max-w-2xl w-full space-y-6">
        {/* Story Image */}
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src={mediaUrl}
            alt={`Story by ${story.owner?.username}`}
            fill
            className="object-cover"
            unoptimized
            priority
          />

          {/* Caption Overlay */}
          {story.caption && (
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-2xl font-semibold">
                {story.caption}
              </p>
            </div>
          )}

          {/* User Info Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/50 backdrop-blur px-4 py-2 rounded-full">
            <Image
              src={avatarUrl}
              alt={story.owner?.username}
              width={36}
              height={36}
              unoptimized
              className="rounded-full object-cover border border-white"
            />
            <div>
              <Link
                href={`/profile/${story.owner?.username}`}
                className="text-white font-semibold hover:underline"
              >
                {story.owner?.username}
              </Link>
              <p className="text-gray-300 text-xs">
                {formatDate(story.created_at)}
              </p>
            </div>
          </div>

          {/* Expired Badge */}
          {isExpired && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="text-center">
                <p className="text-gray-400 text-lg font-semibold">
                  Story Expired
                </p>
                <p className="text-gray-500 text-sm">
                  This story is no longer available
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Views</p>
              <p className="text-white text-2xl font-semibold">
                {story.views?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Reactions</p>
              <p className="text-white text-2xl font-semibold">
                {story.reactions?.length || 0}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {!isExpired && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowReactions(!showReactions)}
                disabled={reacting}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                <Smile size={20} />
                React
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors">
                <Share2 size={20} />
                Share
              </button>
            </div>
          )}

          {/* Reaction Emoji Picker */}
          {showReactions && !isExpired && (
            <div className="flex gap-2 justify-center p-4 bg-gray-800 rounded-lg">
              {EMOJI_REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  disabled={reacting}
                  className="text-2xl hover:scale-125 transition-transform disabled:opacity-50"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reactions */}
        {story.reactions && story.reactions.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Reactions</h3>
            <div className="flex flex-wrap gap-4">
              {story.reactions.map((reaction: any) => (
                <div key={reaction.id} className="flex items-center gap-2">
                  <Image
                    src={
                      getImageUrl(
                        reaction.user?.profile_image || reaction.user?.avatar,
                      ) || "/avatar.png"
                    }
                    alt={reaction.user?.username}
                    width={32}
                    height={32}
                    unoptimized
                    className="rounded-full object-cover border border-gray-600"
                  />
                  <span className="text-white text-sm">
                    {reaction.user?.username}
                  </span>
                  <span className="text-xl">{reaction.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
