import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // No error-tracking service (e.g. Sentry) wired up yet -- the
        // console is the only record for now. Worth adding one once there's
        // real traffic and "check my own console" stops being feasible.
        console.error('Uncaught render error:', error, info)
    }

    handleReload = () => {
        window.location.reload()
    }

    render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
            <h1 className="text-section text-text">Something went wrong</h1>
            <p className="max-w-sm text-body-secondary text-text-secondary">
                An unexpected error occurred. Reloading the page usually fixes it.
            </p>
            <button
                type="button"
                onClick={this.handleReload}
                className="rounded-md bg-accent px-4 py-2 text-body font-medium text-accent-text hover:opacity-90"
            >
                Reload page
            </button>
        </div>
      )
    }

    return this.props.children
  }
}