import { apiClient } from "@/lib/api-client";
import { User } from '@/types/users';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

interface UpdateProfilePayload {
  full_name?: string;
  bio?: string;
  profile_image?: File;
}

/* === Auth === */
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/users/register/', payload);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/users/login/', payload);
  return data;
}

export async function refreshToken(refresh: string) {
  const { data } = await apiClient.post('/users/token/refresh/', { refresh });
  return data;
}

export async function logoutUser() {
  await apiClient.post('/users/logout/');
}

/* === Current User === */
export async function fetchCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<User>("/users/me/");
  return data;
}

/* === Profile === */
export async function fetchMyProfile() {
  const { data } = await apiClient.get("/users/profile/");
  return data;
}

export async function fetchProfile(username: string) {
  const { data } = await apiClient.get(`/users/profile/${username}/`);
  return data;
}

/* === Update Profile === */
export async function updateProfile(payload: UpdateProfilePayload) {
  const formData = new FormData();
  
  if (payload.full_name) {
    formData.append("full_name", payload.full_name);
  }
  if (payload.bio) {
    formData.append("bio", payload.bio);
  }
  if (payload.profile_image) {
    formData.append("profile_image", payload.profile_image);
  }

  // Let Axios handle FormData headers automatically
  const { data } = await apiClient.patch("/users/Update/", formData);
  return data;
}

/* === User Stats === */
export async function fetchUserStats(username: string) {
  try {
    const { data } = await apiClient.get(`/users/${username}/`);
    return {
      followers_count: data.followers_count,
      following_count: data.following_count,
      posts_count: data.posts_count,
      is_following: data.is_following,
    };
  } catch (error) {
    throw error;
  }
}



