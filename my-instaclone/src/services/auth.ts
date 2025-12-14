import { apiClient } from "@/lib/api-client";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export function login(payload: LoginPayload) {
  return apiClient("/auth/login/", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // خیلی مهم
  });
}

export function register(payload: RegisterPayload) {
  return apiClient("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function logout() {
  return apiClient("/auth/logout/", {
    method: "POST",
    credentials: "include",
  });
}
