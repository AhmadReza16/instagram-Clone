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

/* auth */
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/users/register/', payload);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/users/login/', payload);
  return data;
}

// refresh token
export async function refreshToken(refresh: string) {
  const { data } = await apiClient.post('/users/token/refresh/', { refresh });
  return data;
}



export async function logoutUser() {
  await apiClient.post('/users/logout/');
}

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<User>("/users/me/");
  return data;
}

// update profile
export async function updateProfile(data: FormData) {
  const response = await apiClient.patch(
    "/users/Update/",
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
}

/* profile */
export async function fetchMyProfile() {
  const { data } = await apiClient.get("/users/profile/");
  return data;
}

export async function fetchProfile(username: string) {
  const { data } = await apiClient.get(`/users/profile/${username}/`);
  return data;
}



