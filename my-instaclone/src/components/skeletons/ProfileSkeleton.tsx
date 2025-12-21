import { PostSkeleton } from "./PostSkeleton";

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex gap-8 items-center">
        <div className="w-28 h-28 rounded-full bg-gray-200" />

        <div className="flex-1 space-y-4">
          <div className="h-4 w-40 bg-gray-200 rounded" />

          <div className="flex gap-6">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>

          <div className="h-3 w-64 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
