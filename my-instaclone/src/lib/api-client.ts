import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options.auth) {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Something went wrong");
  }

  return res.json();
}


let accessToken: string | null = null;
let refreshToken: string | null = null;

export const initializeTokens = () => {
  accessToken = localStorage.getItem("access_token");
  refreshToken = localStorage.getItem("refresh_token");
};

export const setTokens = (access: string | null, refresh: string | null) => {
  accessToken = access;
  refreshToken = refresh;
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});


api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

  
    if (error.response?.status === 401 && !original._retry && refreshToken) {
      original._retry = true;

      try {
        const res = await axios.post(`${BASE_URL}/api/users/token/refresh/`, {
          refresh: refreshToken,
        });

        accessToken = res.data.access;

        return api(original);
      } catch (err) {
        console.log("Refresh token expired. Logging out...");
        accessToken = null;
        refreshToken = null;
      }
    }

    return Promise.reject(error);
  }
);

export default api;