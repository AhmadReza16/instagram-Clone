import Image from "next/image";
import { User, MapPin, Link as LinkIcon, Settings, Link } from "lucide-react";
import { ProfileActions } from "./ProfileActions";
import { ProfileStats } from "./ProfileStats";

interface ProfileHeaderProps {
  profile: any;
  isOwnProfile?: boolean;
}

export function ProfileHeader({
  profile,
  isOwnProfile = false,
}: ProfileHeaderProps) {
  const avatarUrl = profile.avatar;
  const website = profile.website || profile.website_url;

  return (
    <div className="border-b border-gray-800 py-8">
      <div className="flex gap-8 items-start">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <div className="relative w-40 h-40">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={profile.username}
                fill
                className="rounded-full object-cover border-4 border-gray-800"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border-4 border-gray-800">
                <User size={80} className="text-gray-500" />
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          {/* Username and Actions */}
          <div className="flex items-center gap-6 mb-6">
            <h1 className="text-3xl font-light">{profile.username}</h1>

            {/* Actions Button */}
            {isOwnProfile ? (
              <Link
                href="/profile/edit"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 text-white hover:bg-gray-900 transition"
              >
                <Settings size={18} />
                Edit Profile
              </Link>
            ) : (
              <ProfileActions profile={profile} />
            )}
          </div>

          {/* Stats */}
          <ProfileStats profile={profile} />

          {/* Bio and Details */}
          <div className="mt-6 space-y-3">
            {profile.full_name && (
              <p className="font-semibold text-white">{profile.full_name}</p>
            )}

            {profile.bio && (
              <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
            )}

            {/* Location and Website */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-2">
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              )}
              {website && (
                <a
                  href={
                    website.startsWith("http") ? website : `https://${website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  <LinkIcon size={16} />
                  <span>{website}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
