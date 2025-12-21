import { PostSkeleton } from "./PostSkeleton";

export function FeedSkeleton() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}
