import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    // Deliberately blank rather than a spinner: this only shows for the
    // brief window while AuthContext checks an existing token, and a
    // spinner that flashes for ~100ms reads as a bug, not a feature.
    return null
  }

  if (!isAuthenticated) {
    // Preserve where the user was headed so a post-login redirect could
    // send them back (not wired up yet, but the data is here when it is).
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
