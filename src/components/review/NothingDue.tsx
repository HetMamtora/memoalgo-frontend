import { Link } from 'react-router-dom'

export function NothingDue() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface px-6 py-14 text-center">
        {/* Coffee cup icon */}
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-bg">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-accent-link"
            >
                <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
            </svg>
        </span>

        <div className="flex flex-col gap-1">
            <h2 className="text-section text-text">Nothing due today</h2>
            <p className="text-body-secondary text-text-secondary">
                Your next review will surface tomorrow. Take a break!
            </p>
        </div>

        <Link
            to="/app/library"
            className="rounded-md border border-border px-4 py-2 text-body-secondary font-medium text-text-secondary hover:bg-bg"
        >
            Browse library
        </Link>
    </div>
  )
}