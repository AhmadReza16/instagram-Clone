import { apiClient } from "@/lib/api-client";

export function fetchProfile(username: string) {
  return apiClient(`/users/${username}/`);
}

export function updateProfile(data: FormData) {
  return apiClient(`/users/me/`, {
    method: "PATCH",
    body: data,
  });
}
