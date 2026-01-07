import { create } from "zustand";
import { authService, LoginPayload, RegisterPayload } from "@/services/auth";

export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;

  initialize: () => void;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  access: null,
  refresh: null,
  loading: false,
  error: null,

  // بازیابی توکن‌ها هنگام رفرش صفحه
  initialize: () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user = localStorage.getItem("user");

    if (access && refresh) {
      set({
        access,
        refresh,
        user: user ? JSON.parse(user) : null,
      });
    }
  },

  // Login
  login: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await authService.login(data);

      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("user", JSON.stringify(res.user));

      set({
        access: res.access,
        refresh: res.refresh,
        user: res.user,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.detail || "Login failed",
        loading: false,
      });
      throw err;
    }
  },

  // Register
  register: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await authService.register(data);

      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("user", JSON.stringify(res.user));

      set({
        access: res.access,
        refresh: res.refresh,
        user: res.user,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.detail || "Register failed",
        loading: false,
      });
      throw err;
    }
  },

  // Logout
  logout: async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    set({
      user: null,
      access: null,
      refresh: null,
      loading: false,
      error: null,
    });
  },
}));
