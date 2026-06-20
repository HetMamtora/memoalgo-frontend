import type { ReactNode } from 'react'

interface EmptyStateProps {
    title: string
    body: string
    action?: ReactNode
}

export function EmptyState({ title, body, action}: EmptyStateProps) {
    return (
        <div className='flex flex-col items-center gap-3 rounded-lg border border-border bg-surface px-6 py-12 text-center'>
            <h2 className='text-card-title text-text'>{title}</h2>
            <p className='max-w-sm text-body-secondary text-text-secondary'>{body}</p>
            {action}
        </div>
    )
}