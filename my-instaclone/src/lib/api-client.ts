import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  withCredentials: true, // مهم: برای cookie-based auth
});

// Add token to request headers
apiClient.interceptors.request.use(
  (config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
  },
  (error) => Promise.reject(error)
);

// Track if we're already trying to refresh to prevent infinite loops
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// Response interceptor برای refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes('/users/token/refresh/')) {
      localStorage.clear()
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }


    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh = localStorage.getItem('refresh');

        if (!refresh) throw new Error("No refresh token");

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"}/users/token/refresh/`,
          { refresh },
          { withCredentials: true }
        );

        const newAccessToken = response.data.access;

        localStorage.setItem('access', newAccessToken);

        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return apiClient(originalRequest);
      } catch (err) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        processQueue(err, null);
        return Promise.reject(err);
      }
    }


    // اگر پہلے سے refresh ہو رہی ہے تو queue میں ڈالیں
    if (error.response?.status === 401 && isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };

