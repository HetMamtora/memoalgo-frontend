import { Link } from "react-router-dom"
import { Logo }  from "@/components/common/Logo"
import { IconLibrary, IconReview, IconStats } from "@/components/common/icons"

const FEATURES = [
    {
        Icon: IconReview,
        title: 'Spaced repetition, done right',
        body: "Built on the SM-2 algorithm -- the same math behind Anki -- reviews surface exactly when you're about to forget, not on a fixed schedule.",
    },
    {
        Icon: IconLibrary,
        title: 'Track Every Problem',
        body: 'Log what you solve by topic and difficulty, then let the schedule tell you what actually needs revisiting today.',
    },
    {
        Icon: IconStats,
        title: 'See your progress',
        body: 'Streaks, retention rate, and topic-level weak spots, updated automatically after every review.',
    }
]

const STEPS = [
  {
    number: '1',
    title: "Add what you've solved",
    body: "Log problems from LeetCode or any where else, in seconds",
  },
  {
    number: '2',
    title: "MemoAlgo Schedules your reviews",
    body: 'SM-2 Algorithm for spaced repetition decides exactly when each problem resurfaces',
  },
  {
    number: '3',
    title: 'Rate your recall',
    body: 'One tap reschedules the next review automatically, easy problems space out, hard ones come back sooner.',
  },
]

// Reused for both CTA buttons below. A plain styled <Link> rather than the
// shared <Button> component wrapped in a <Link> -- Button renders a real
// <button>, and nesting an interactive button inside an anchor is invalid
// HTML and bad for screen readers. Two call sites is too few to justify
// making Button itself polymorphic (an `as` prop) right now.
const ctaClasses =
  'inline-flex items-center justify-center rounded-md bg-accent font-medium text-accent-text ' +
  'transition-colors duration-150 hover:opacity-90'

export function Landing() {
    return (
        <div className="flex min-h-screen flex-col bg-bg">
            <header className="flex items-center justify-between border-b border-border px-4 py-4 md:px-8">
                <Logo size="md" />
                <nav className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-body-secondary text-text-secondary hover:text-text"
                    >
                        Sign In
                    </Link>
                    <Link 
                        to="/register"
                        className={`${ctaClasses} px-3 py-1.5 text-body-secondary`}
                    >
                        Get started
                    </Link>
                </nav>
            </header>

            <section className="flex flex-col items-center gap-5 px-4 py-16 text-center md:py-24">
                <h1 className="max-w-2xl text-hero text-text">
                    Never forget a DSA Pattern again
                </h1>
                <p className="max-w-xl text-body text-text-secondary md:text-card-title">
                    Spaced Repetition build for the problems you've already solved. Know exactly what to revise everyday.
                </p>
                <Link to="/register" className={`${ctaClasses} px-6 py-2.5 text-body`}>
                    Get started free
                </Link>
            </section>

            <section className="grid gap-6 px-4 py-12 md:grid-cols-3 md:px-8 md:py-16">
                {FEATURES.map(({ Icon, title, body}) => (
                    <div
                        key={title}
                        className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5"
                    >
                        <Icon className="h-5 w-5 text-accent-link" />
                        <h2 className="text-card-title text-text">{title}</h2>
                        <p className="text-body-secondary text-text-secondary">{body}</p>
                    </div>
                ))}
            </section>

            <section className="flex flex-col gap-8 px-4 py-12 md:px-8 md:py-16">
                <h2 className="text-center text-section text-text">How it works</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {STEPS.map(({ number, title, body }) => (
                        <div key={number} className="flex flex-col gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-bg text-body-secondary font-medium text-accent-link">
                                {number}
                            </span>
                            <h3 className="text-card-title text-text">{title}</h3>
                            <p className="text-body-secondary text-text-secondary">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="mt-auto flex flex-col items-center gap-2 border-t border-border px-4 py-6 text-center md:flex-row md:justify-between md:px-8">
                <p className="text-caption text-text-tertiary">
                    &copy; {new Date().getFullYear()} MemoAlgo
                </p>

                <p className="flex gap-4 text-caption text-text-tertiary">
                    <span>About</span>
                    <span>Privacy</span>
                    <span>Contact</span>
                </p>
            </footer>
        </div>
    )
}