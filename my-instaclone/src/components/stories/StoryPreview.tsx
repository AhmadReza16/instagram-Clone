import Image from "next/image";

interface StoryPreviewProps {
  mediaUrl: string;
}

export function StoryPreview({ mediaUrl }: StoryPreviewProps) {
  return (
    <div className="aspect-9/16 rounded-lg overflow-hidden bg-black">
      <Image src={mediaUrl} alt="story preview" fill className="object-cover" />
    </div>
  );
}
