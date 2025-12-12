import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api/',
  withCredentials: true, // send cookies (HttpOnly) if backend sets them
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // global error handling: 401 refresh token logic can be added here
    return Promise.reject(error)
  }
)

export default api