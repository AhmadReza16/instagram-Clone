import api, { setTokens } from "@/lib/api-client";

export interface LoginPayload {
  username: string;
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
  async register(data: RegisterPayload): Promise<AuthResponse> {
    const res = await api.post("/api/users/register/", data);
    const result = res.data as AuthResponse;

    setTokens(result.access, result.refresh); // ذخیره توکن
    return result;
  },

  async login(data: LoginPayload): Promise<AuthResponse> {
    const res = await api.post("/api/users/login/", data);
    const result = res.data as AuthResponse;

    setTokens(result.access, result.refresh);
    return result;
  },

  async logout() {
    try {
      await api.post("/api/users/logout/");
    } catch (err) {
      console.log("Logout error but continuing:", err);
    }

    setTokens(null, null); // پاک کردن توکن‌ها
  },

  async getCurrentUser() {
    const res = await api.get("/api/users/me/");
    return res.data;
  },
};