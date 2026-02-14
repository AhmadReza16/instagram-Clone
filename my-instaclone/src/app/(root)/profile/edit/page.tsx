"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile } from "@/services/users";
import Image from "next/image";
import { User, Camera } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const { user: currentUser, loading: authLoading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login");
    }
  }, [authLoading, currentUser, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() && !bio.trim() && !avatar) {
      setError("Please update at least one field");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateProfile({
        full_name: fullName || undefined,
        bio: bio || undefined,
        profile_image: avatar || undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        router.replace(`/profile/${currentUser?.username}`);
      }, 1500);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to update profile";
      setError(errorMsg);
      console.error("Update profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-400 mt-2">Update your profile information</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-lg border border-gray-800 p-8 space-y-8"
        >
          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-semibold mb-4">
              Profile Picture
            </label>
            <div className="flex items-start gap-6">
              {/* Current or Preview Avatar */}
              <div className="relative w-32 h-32 flex-shrink-0">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded-full object-cover"
                  />
                ) : currentUser?.avatar ? (
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <User size={64} className="text-gray-500" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-3 cursor-pointer transition">
                  <Camera size={20} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Upload Info */}
              <div className="flex-1 pt-2">
                <p className="text-gray-400 text-sm mb-3">
                  Recommended: Square image, at least 400x400 pixels
                </p>
                {avatar && (
                  <p className="text-green-400 text-sm">
                    ✓ {avatar.name} selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={currentUser?.full_name || "Enter your full name"}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              maxLength={150}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={currentUser?.bio || "Tell us about yourself..."}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
              rows={4}
              maxLength={150}
            />
            <p className="text-gray-500 text-xs mt-2">{bio.length}/150</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-900 border border-green-700 rounded-lg p-4 text-sm text-green-200">
              ✓ Profile updated successfully! Redirecting...
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (!fullName.trim() && !bio.trim() && !avatar)}
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
