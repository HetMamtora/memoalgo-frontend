import { useReviews } from "@/hooks/useReviews"
import { ReviewCard } from "@/components/review/ReviewCard"
import { SessionComplete } from "@/components/review/SessionComplete"
import { NothingDue } from "@/components/review/NothingDue"

export function Review() {
    
    const {
        phase,
        error,
        currentProblem,
        currentIndex,
        totalDue,
        summary,
        submitRating,
    } = useReviews()
    
    return (
        <div  className="mx-auto flex max-w-lg flex-col gap-4">
            <h1 className="text-section text-text">Review Session</h1>

            {phase === 'loading' && (
                <p className="text-body-secondary text-text-tertiary">Loading due problems...</p>
            )}

            {phase === 'empty' && !error && <NothingDue />}

            {phase === 'empty' && error && (
                <p className="text-body text-danger-text">{error}</p>
            )}

            {phase === 'active' && currentProblem && (
                <ReviewCard
                    key={currentProblem.id}
                    problem={currentProblem}
                    currentIndex={currentIndex}
                    totalDue={totalDue}
                    onRate={submitRating}
                    error={error}
                />
            )}

            {phase === 'complete' && <SessionComplete summary={summary} />}
        </div>
    )
}