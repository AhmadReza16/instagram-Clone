
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

type FetchOptions = RequestInit;

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // ⬅️ کلیدی
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Something went wrong");
  }

  return res.json();
}
console.log("BASE_URL:", BASE_URL);