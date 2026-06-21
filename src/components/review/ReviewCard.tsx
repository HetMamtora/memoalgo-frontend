import { useState } from "react"
import { Badge } from "@/components/common/Badge"
import { DIFFICULTY_LABEL, DIFFICULTY_VARIANT } from "@/utils/difficulty"
import type { ProblemResponse, ReviewQuality } from "@/types"

interface ReviewCardProps {
    problem: ProblemResponse
    currentIndex: number
    totalDue: number
    onRate: (quality: ReviewQuality) => Promise<void>
    error: string | null
}

const RATINGS: { quality: ReviewQuality; label: string; hint: string; color: string }[] = [
    {
        quality: 1,
        label: 'Again',
        hint: 'Completely forgot',
        color: 'bg-danger-bg text-danger-text hover:opacity-80',
    },
    {
        quality: 3,
        label: 'Hard',
        hint: 'Struggled but got it',
        color: 'bg-warning-bg text-warning-text hover:opacity-80',
    },
    {
        quality: 4,
        label: 'Good',
        hint: 'Recalled with effort',
        color: 'bg-success-bg text-success-text hover:opacity-80',
    },
    {
        quality: 5,
        label: 'Easy',
        hint: 'Instant recall',
        color: 'bg-accent-bg text-accent-link hover:opacity-80',
    },
]

export function ReviewCard({
    problem,
    currentIndex,
    totalDue,
    onRate,
    error,
}: ReviewCardProps) {
    const [revealed, setRevealed] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const progress = ((currentIndex + 1) / totalDue) * 100

    async function handleRate(quality: ReviewQuality) {
        setIsSubmitting(true)
        try{
            await onRate(quality)
        } finally {
            setIsSubmitting(false)
            setRevealed(false)
        }
    }

    return (
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-6">
            {/* Progress Bar */}
            <div className="flex flex-col gap-1.5">
                <span className="text-body-secondary text-text-tertiary">
                    {currentIndex + 1} of {totalDue}
                </span>
                <div className="h-1.5 overflow-hidden rounded-full bg-bg">
                    <div
                        className="h-full rounded-full bg-accent transition-all duration-300"
                        style={{width: `${progress}%`}}
                    />
                </div>
            </div>

            {/* Problem Info */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-section text-text">{problem.title}</h2>
                    <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]}>
                        {DIFFICULTY_LABEL[problem.difficulty]}
                    </Badge>
                </div>

                {problem.topicName && (
                    <p className="text-body-secondary text-text-tertiary">{problem.topicName}</p>
                )}

                {problem.url && (
                    <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-secondary text-accent-link hover:underline"
                    >
                        Open on LeetCode →
                    </a>
                )}

                {problem.notes && (
                    <p className="whitespace-pre-wrap rounded-md bg-bg p-3 text-body-secondary text-text-secondary">
                        {problem.notes}
                    </p>
                )}
            </div>

            {/* Progressive disclosure: reveal -> rate */}
            {!revealed ? (
                <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="rounded-md bg-accent px-4 py-2.5 text-body font-medium text-accent-text transition-colors hover:opacity-90"
                >
                    I solved it - rate my recall
                </button>
            ) : (
                <div className="flex flex-col gap-2">
                    <p className="text-body-secondary text-text-secondary">How well did you recall it ?</p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        {RATINGS.map(({ quality, label, hint, color}) => (
                            <button
                                key={quality}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => handleRate(quality)}
                                className={`flex flex-col items-center gap-0.5 rounded-md px-3 py-2.5 transition-colors disabled:opacity-60 ${color}`}
                            >
                                <span className="text-body font-medium">{label}</span>
                                <span className="text-caption opacity-80">{hint}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <p role="alert" className="text-caption text-danger-text">
                    {error}
                </p>
            )}
        </div>
    )
}