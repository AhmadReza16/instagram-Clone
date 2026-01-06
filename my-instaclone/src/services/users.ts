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

export function fetchProfile(username: string) {
  return apiClient(`/users/${username}/`);
}

export function updateProfile(data: FormData) {
  return apiClient(`/users/me/`, {
    method: "PATCH",
    body: data,
  });
}
