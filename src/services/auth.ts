import { api } from '@/services/api'
import type { AuthResponse, LoginRequest, RegisterRequest, UserResponse } from '@/types'

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/register', data)
  return res.data
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', data)
  return res.data
}

export async function getCurrentUser(): Promise<UserResponse> {
  const res = await api.get<UserResponse>('/users/me')
  return res.data
}
