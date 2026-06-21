import { Link } from 'react-router-dom'
import type { SessionSummary } from '@/hooks/useReviews'

interface SessionCompleteProps {
  summary: SessionSummary
}

export function SessionComplete({ summary }: SessionCompleteProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface px-6 py-14 text-center">
        {/* Checkmark circle */}
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-bg">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-success-text"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </span>

        <div className="flex flex-col gap-1">
            <h2 className="text-section text-text">All caught up!</h2>
            <p className="text-body-secondary text-text-secondary">
                You reviewed {summary.total} {summary.total === 1 ? 'problem' : 'problems'} this session.
            </p>
        </div>

        <div className="flex gap-4 text-body-secondary">
            <span className="text-success-text">{summary.goodOrEasy} good / easy</span>
            <span className="text-warning-text">{summary.needsRetry} needed retry</span>
        </div>

        <Link
            to="/app"
            className="rounded-md bg-accent px-4 py-2 text-body font-medium text-accent-text hover:opacity-90"
        >
            Back to dashboard
        </Link>
    </div>
  )
}