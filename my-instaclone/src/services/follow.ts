import { apiClient } from "@/lib/api-client";

// follow / unfollow (toggle)
export async function toggleFollow(userId: number) {
  const { data } = await apiClient.post(`/follow/toggle/`, {
    user_id: userId,
  });
  return data;
}

// followers list
export async function fetchFollowers(userId: number) {
  const { data } = await apiClient.get(`/follow/followers/${userId}/`);
  return data;
}

// following list
export async function fetchFollowing(userId: number) {
  const { data } = await apiClient.get(`/follow/following/${userId}/`);
  return data;
}

// is following ?
export async function isFollowing(userId: number) {
  const { data } = await apiClient.get(`/follow/is-following/${userId}/`);
  return data;
}

// follow suggestions
export async function fetchFollowSuggestions() {
  const { data } = await apiClient.get(`/follow/suggestions/`);
  return data;
}