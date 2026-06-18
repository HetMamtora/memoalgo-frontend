import { type HTMLAttributes } from 'react'

export function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
