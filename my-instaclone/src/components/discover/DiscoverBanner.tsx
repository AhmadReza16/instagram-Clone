import React from "react";
import { Sparkles, Heart, Users } from "lucide-react";

interface DiscoverBannerProps {
  showFollow?: boolean;
}

export function DiscoverBanner({ showFollow = true }: DiscoverBannerProps) {
  return (
    <div className="rounded-lg border border-border bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Sparkles className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground mb-1">
            ✨ Discover Great Posts
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {showFollow
              ? "Follow people and engage with content to personalize your feed with posts tailored just for you."
              : "Check out these trending posts from the community! Start following creators you love."}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>Popular posts</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>From creators you might like</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
