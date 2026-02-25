import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

interface HighlightItemProps {
  highlight: {
    id: number;
    cover?: string;
    media?: string;
    title?: string;
    caption?: string;
  };
  onClick: () => void;
}

export function HighlightItem({ highlight, onClick }: HighlightItemProps) {
  // Handle both highlight (cover field) and story (media field) formats
  const imageUrl =
    getImageUrl(highlight.cover || highlight.media) || "/placeholder.png";
  const title = highlight.title || highlight.caption || "Highlight";

  return (
    <button onClick={onClick} className="text-center">
      <div className="w-16 h-16 rounded-full border p-1">
        <Image
          src={imageUrl}
          alt={title}
          width={64}
          height={64}
          unoptimized
          className="rounded-full object-cover"
        />
      </div>
      <p className="text-xs mt-1 truncate max-w-[80px]">{title}</p>
    </button>
  );
}
