import { Button } from '@/components/common/Button'
import { Logo } from '@/components/common/Logo'
import { useAuth } from '@/hooks/useAuth'

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
