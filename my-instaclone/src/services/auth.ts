import { apiClient } from "@/lib/api-client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
  };
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post("/users/login/", payload);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post("/users/register/", payload);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/users/logout/");
    return response.data;
  },

  refreshToken: async (refresh: string) => {
    const response = await apiClient.post("/users/token/refresh/", {
      refresh: refresh,
    });
    return response.data;
  },
};

// Export functions for backward compatibility
export function login(payload: LoginPayload) {
  return authService.login(payload);
}

export function register(payload: RegisterPayload) {
  return authService.register(payload);
}

export function logout() {
  return authService.logout();
}
