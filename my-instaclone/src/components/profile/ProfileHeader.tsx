import Image from "next/image";
import { ProfileActions } from "./ProfileActions";
import { ProfileStats } from "./ProfileStats";

export function ProfileHeader({ profile }: { profile: any }) {
  return (
    <div className="flex gap-8">
      <Image
        src={profile.avatar}
        alt={profile.username}
        width={120}
        height={120}
        className="rounded-full"
      />

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
