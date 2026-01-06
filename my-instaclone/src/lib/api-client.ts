import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // مهم: برای cookie-based auth
});

// Optional: response interceptor برای refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await apiClient.post('/users/refresh/');
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };


// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// type FetchOptions = RequestInit;

// export async function apiClient<T>(
//   endpoint: string,
//   options: FetchOptions = {}
// ): Promise<T> {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     credentials: "include", // ⬅️ کلیدی
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.detail || "Something went wrong");
//   }

//   return res.json();
// }
// console.log("BASE_URL:", BASE_URL);

