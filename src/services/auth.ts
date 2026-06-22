import { api } from '@/services/api'
import type { 
    AuthResponse, 
    LoginRequest,
    RegisterRequest,
    UserResponse,
    InitiatePasswordResetRequest,
    OtpResponse,
    VerifyOtpRequest
} from '@/types'

export async function initiateRegistration(data: RegisterRequest): Promise<OtpResponse> {
    const res = await api.post<OtpResponse>('/auth/register/initiate', data)
    return res.data
}
 
export async function verifyRegistration(data: VerifyOtpRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register/verify', data)
    return res.data
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', data)
    return res.data
}

export async function initiatePasswordReset(
    data: InitiatePasswordResetRequest
  ): Promise<OtpResponse> {
    const res = await api.post<OtpResponse>('/auth/password-reset/initiate', data)
    return res.data
}
 
export async function verifyPasswordReset(data: VerifyOtpRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/password-reset/verify', data)
    return res.data
}

export async function getCurrentUser(): Promise<UserResponse> {
    const res = await api.get<UserResponse>('/users/me')
    return res.data
}
