import { createContext, useEffect, useState, type ReactNode } from 'react'
import * as authService from '@/services/auth'
import { clearToken, getToken, setToken } from '@/utils/localStorage'
import type { LoginRequest, RegisterRequest, UserResponse } from '@/types'

export interface AuthContextValue {
  user: UserResponse | null
  /** True only during the initial "do we already have a valid token?" check on mount. */
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  // Only true if a token exists, i.e. there's actually something to check.
  // Computing this from getToken() up front means the effect below never
  // needs to call setIsLoading(false) synchronously in its body -- it's
  // already false on mount when there's no token to verify.
  const [isLoading, setIsLoading] = useState(() => getToken() !== null)

  // On first mount: if a token survived a refresh, hydrate the user from
  // it. This is what makes "stay logged in across reloads" work without
  // storing the user object itself (which could go stale).
  useEffect(() => {
    if (!getToken()) return

    authService
      .getCurrentUser()
      .then(setUser)
      .catch(() => {
        // Token is missing/expired/invalid -- the response interceptor in
        // services/api.ts already cleared it and redirected on 401/403,
        // this catch just makes sure local state agrees.
        clearToken()
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  async function login(data: LoginRequest) {
    const auth = await authService.login(data)
    setToken(auth.accessToken)
    const me = await authService.getCurrentUser()
    setUser(me)
  }

  async function register(data: RegisterRequest) {
    const auth = await authService.register(data)
    setToken(auth.accessToken)
    const me = await authService.getCurrentUser()
    setUser(me)
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
