"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getImageUrl } from "@/lib/image-url";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";

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

interface MyStoryPreviewProps {
  stories: MyStory[];
  onClose?: () => void;
}

export default function MyStoryPreview({
  stories,
  onClose,
}: MyStoryPreviewProps) {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Debug: Log stories when component receives them
  console.log("MyStoryPreview received stories:", stories);

  if (stories.length === 0) return null;

  const currentStory = stories[currentIndex];
  const mediaUrl = getImageUrl(currentStory.media) || "/placeholder.png";
  const isExpired = new Date(currentStory.expires_at) < new Date();

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsViewerOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const profileImage = user?.profile_image || user?.avatar;

  return (
    <>
      {/* Story Preview Button - Circular */}
      <button
        onClick={() => setIsViewerOpen(true)}
        className="relative w-20 h-20 rounded-full border-2 border-blue-500 hover:border-blue-400 overflow-hidden transition-all hover:scale-105"
      >
        <Image
          src={profileImage ? getImageUrl(profileImage) : "/placeholder.png"}
          alt={user?.username || "Your Story"}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Plus Icon */}
        <div className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg transition-colors">
          +
        </div>
        {/* Badge showing number of stories */}
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {stories.length}
        </div>
      </button>

      {/* Full Screen Story Viewer */}
      {isViewerOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsViewerOpen(false)}
            className="absolute top-4 left-4 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <X size={28} />
          </button>

          {/* Story Container */}
          <div className="relative w-full h-full max-w-md max-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-b from-black to-transparent absolute top-0 left-0 right-0 p-4 z-10">
              <div className="flex items-center gap-3">
                <Image
                  src={
                    profileImage
                      ? getImageUrl(profileImage)
                      : "/placeholder.png"
                  }
                  alt={user?.username || "Your Story"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  unoptimized
                />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">
                    {user?.username}
                  </p>
                  <p className="text-gray-300 text-xs">
                    {new Date(currentStory.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{
                    width: `${((currentIndex + 1) / stories.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Story Image/Video */}
            <div className="flex-1 relative bg-gray-900">
              <Image
                src={mediaUrl}
                alt="Story"
                fill
                className="object-contain"
                unoptimized
              />

              {/* Caption Overlay */}
              {currentStory.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-sm">{currentStory.caption}</p>
                </div>
              )}

              {isExpired && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-gray-300">This story has expired</span>
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="bg-gradient-to-t from-black to-transparent p-4 text-white text-sm">
              <p className="text-gray-300">
                Views:{" "}
                <span className="text-white font-semibold">
                  {currentStory.views?.length || 0}
                </span>
              </p>
            </div>

            {/* Navigation */}
            {stories.length > 1 && (
              <>
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-colors"
                  aria-label="Previous story"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={currentIndex === stories.length - 1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed z-10 transition-colors"
                  aria-label="Next story"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentIndex + 1} of {stories.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
