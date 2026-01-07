import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // مهم: برای cookie-based auth
});

// Add token to request headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor برای refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('refresh');
        const response = await apiClient.post('/users/token/refresh/', {
          refresh: refresh,
        });
        
        const newAccessToken = response.data.access;
        localStorage.setItem('access', newAccessToken);
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
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

