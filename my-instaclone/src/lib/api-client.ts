import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

let accessToken: string | null = null;
let refreshToken: string | null = null;

// ست کردن توکن‌ها از بیرون
export const setTokens = (access: string | null, refresh: string | null) => {
  accessToken = access;
  refreshToken = refresh;
};

// axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // برای refresh token با cookie اگر نیاز شد
});

// اضافه کردن AccessToken قبل از هر درخواست
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// هندل کردن 401: تلاش برای refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // اگر 401 بود و قبلاً retry نشده
    if (error.response?.status === 401 && !original._retry && refreshToken) {
      original._retry = true;

      try {
        const res = await axios.post(`${BASE_URL}/api/users/token/refresh/`, {
          refresh: refreshToken,
        });

        accessToken = res.data.access; // توکن جدید

        return api(original); // ارسال دوباره درخواست
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