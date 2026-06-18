import axios, { AxiosError } from 'axios'
import { clearToken, getToken } from '@/utils/localStorage'
import type { ApiErrorBody } from '@/types'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

/**
 * Single shared Axios instance (Singleton pattern). Every service module
 * (auth.ts, problems.ts, reviews.ts, stats.ts...) imports THIS, never
 * `axios` directly -- that's what makes the interceptors below universal
 * instead of something every call site has to remember to do.
 */
export const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// --- Request interceptor: attach the JWT bearer token -----------------
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// --- Response interceptor: centralised 401/403 handling ----------------
// Deliberately does NOT import AuthContext/React here. Axios is plain
// JS infrastructure; coupling it to a React context would mean the auth
// state machine and the HTTP layer could disagree about whether the user
// is logged in. A hard redirect + storage clear is the one thing that's
// always correct, independent of which component triggered the request.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearToken()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

/**
 * Extracts a human-readable message from an Axios error, falling back to
 * a generic string. The backend's exact error envelope isn't nailed down
 * in the handoff doc (only status codes are) -- this is the one place
 * that assumption lives, so when the real shape is confirmed only this
 * function needs to change.
 */
export function extractErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.'
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? error.response?.data?.error ?? fallback
  }
  return fallback
}
