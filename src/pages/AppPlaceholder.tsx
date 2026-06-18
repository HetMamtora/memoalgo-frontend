import { Button } from '@/components/common/Button'
import { Logo } from '@/components/common/Logo'
import { useAuth } from '@/hooks/useAuth'

/**
 * TEMPORARY. Day 9 replaces this with the real App Shell (sidebar/bottom
 * nav) and routes to Dashboard/Library/Review/Stats. This page exists
 * purely so the Day 8 auth flow has somewhere real to land and can be
 * clicked through end-to-end.
 */
export function AppPlaceholder() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4">
      <Logo size="md" />
      <p className="text-body text-text">
        Signed in as <span className="font-medium">{user?.username}</span> ({user?.email})
      </p>
      <p className="text-body-secondary text-text-tertiary">
        App shell, dashboard, and navigation land on Day 9.
      </p>
      <Button variant="secondary" onClick={logout}>
        Log out
      </Button>
    </div>
  )
}
