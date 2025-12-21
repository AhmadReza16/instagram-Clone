"use client";

interface StoryMediaUploadProps {
  onSelect: (file: File) => void;
}

export function StoryMediaUpload({ onSelect }: StoryMediaUploadProps) {
  return (
    <input
      type="file"
      accept="image/*,video/*"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          onSelect(e.target.files[0]);
        }
      }}
    />
  );
}
