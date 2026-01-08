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

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/users/login/', payload);
  return data;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/users/register/', payload);
  return data;
}

export async function logoutUser() {
  await apiClient.post('/users/logout/');
}

export async function fetchProfile(username: string) {
  const { data } = await apiClient.get(`/users/${username}/`);
  return data;
}

export async function updateProfile(data: FormData) {
  const { data: responseData } = await apiClient.patch(`/users/me/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return responseData;
}
