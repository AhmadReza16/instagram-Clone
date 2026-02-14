import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

interface HighlightItemProps {
  highlight: {
    id: number;
    cover: string;
    title?: string;
  };
  onClick: () => void;
}

export function HighlightItem({ highlight, onClick }: HighlightItemProps) {
  const coverUrl = getImageUrl(highlight.cover);

  return (
    <button onClick={onClick} className="text-center">
      <div className="w-16 h-16 rounded-full border p-1">
        <Image
          src={coverUrl}
          alt=""
          width={64}
          height={64}
          unoptimized
          className="rounded-full object-cover"
        />
      </div>
      <p className="text-xs mt-1">{highlight.title}</p>
    </button>
  );
}
