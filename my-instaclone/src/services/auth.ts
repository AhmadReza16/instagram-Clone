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
  return apiClient("/users/login/", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // خیلی مهم
  });
}

export function register(payload: RegisterPayload) {
  return apiClient("/users/register/", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // خیلی مهم
  });
}

export function logout() {
  return apiClient("/users/logout/", {
    method: "POST",
    credentials: "include",
  });
}
