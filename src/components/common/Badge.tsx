import type { ReactNode } from "react"

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral'

interface BadgeProps {
    variant?: BadgeVariant
    children: ReactNode
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
    success: 'bg-success-bg text-success-text',
    warning: 'bg-warning-bg text-warning-text',
    danger: 'bg-danger-bg text-danger-text',
    neutral: 'border border-border text-text-secondary',
}

export function Badge({ variant = 'neutral', children}: BadgeProps) {
    return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-caption font-medium ${VARIANT_CLASSES[variant]}`}>
            {children}
        </span>
    )
}