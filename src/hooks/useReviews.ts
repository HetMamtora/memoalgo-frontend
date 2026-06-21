import { useCallback, useEffect, useState } from "react"
import * as reviewsService from '@/services/reviews'
import { extractErrorMessage } from "@/services/api"
import type { ProblemResponse, ReviewQuality, ReviewResponse } from "@/types"

export type SessionPhase = 'loading' | 'empty' | 'active' | 'complete'

export interface SessionSummary {
    total: number
    /** Reviews rated Good (4) or Easy (5). */
    goodOrEasy: number
    /** Reviews rated Again (1) or Hard (3). */
    needsRetry: number
}

export function useReviews() {
    const [dueProblems, setDueProblems] = useState<ProblemResponse[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [phase, setPhase] = useState<SessionPhase>('loading')
    const [error, setError] = useState<string | null>(null)
    const [lastResult, setLastResult] = useState<ReviewResponse | null>(null)

    const [summary, setSummary] = useState<SessionSummary>({
        total: 0,
        goodOrEasy: 0,
        needsRetry: 0,
    })

    const loadDueProblems = useCallback(() => {
        setPhase('loading')
        setError(null)
        reviewsService
            .getDueProblems()
            .then((res) => {
                setDueProblems(res.dueProblems)
                setCurrentIndex(0)
                setSummary({total: 0, goodOrEasy: 0, needsRetry: 0})
                setLastResult(null)
                setPhase(res.dueCount === 0 ? 'empty' : 'active')
            })
            .catch((err: unknown) => {
                setError(extractErrorMessage(err, 'Could not load due problems'))
                setPhase('empty')
            })
    }, [])

    // Deferred through a microtask for the same eslint reason as useProblems.
    useEffect(() => {
        void Promise.resolve().then(() => loadDueProblems())
    }, [loadDueProblems])

    const currentProblem: ProblemResponse | null =
        phase === 'active' && currentIndex < dueProblems.length
            ? dueProblems[currentIndex]
            : null

    async function submitRating(quality: ReviewQuality) {
        if(!currentProblem) return

        setError(null)
        try{
            const result = await reviewsService.SubmitReview(currentProblem.id, { quality })
            setLastResult(result)

            setSummary((prev) => ({
                total: prev.total + 1,
                goodOrEasy: prev.goodOrEasy + (quality >= 4 ? 1 : 0),
                needsRetry: prev.needsRetry + (quality < 4 ? 1 : 0),
            }))

            const nextIndex = currentIndex + 1
            if(nextIndex >= dueProblems.length){
                setPhase('complete')
            } else {
                setCurrentIndex(nextIndex)
            }
        } catch (err: unknown) {
            setError(extractErrorMessage(err, 'Failed to submit review'))
        }
    }

    return {
        phase,
        error,
        currentProblem,
        currentIndex,
        totalDue: dueProblems.length,
        lastResult,
        summary,
        submitRating,
        restart: loadDueProblems,
    }
}