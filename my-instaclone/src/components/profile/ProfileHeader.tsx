import Image from "next/image";
import { User } from "lucide-react";
import { ProfileActions } from "./ProfileActions";
import { ProfileStats } from "./ProfileStats";

export function ProfileHeader({ profile }: { profile: any }) {
  const avatarUrl = profile.avatar;

  return (
    <div className="flex gap-8">
      <div className="relative w-32 h-32">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={profile.username}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <User size={64} className="text-gray-500" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{profile.username}</h1>
          <ProfileActions profile={profile} />
        </div>

        <ProfileStats profile={profile} />

        <p>{profile.bio}</p>
      </div>
    </div>
  );
}
