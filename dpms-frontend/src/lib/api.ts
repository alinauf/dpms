import axios from 'axios'
import { useAuthStore } from './auth.store'

// Create axios instance with default config

// API Response type
export type ApiResponse<T> = {
  message: string
  data: T
}

const api = axios.create({
  baseURL: process.env.BACKEND_API || 'https://dpms-backend.nauf.dev',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default api
