import Image from "next/image";

export function HighlightItem({ highlight, onClick }: any) {
  return (
    <button onClick={onClick} className="text-center">
      <div className="w-16 h-16 rounded-full border p-1">
        <Image
          src={highlight.cover}
          alt=""
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <p className="text-xs mt-1">{highlight.title}</p>
    </button>
  );
}
