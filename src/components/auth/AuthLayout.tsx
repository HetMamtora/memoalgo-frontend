import { type ReactNode } from 'react'
import { Logo } from '@/components/common/Logo'
import { Card } from '@/components/common/Card'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="flex w-full max-w-[280px] flex-col items-center gap-6">
        <Logo size="md" />
        <Card className="w-full">{children}</Card>
      </div>
    </div>
  )
}
