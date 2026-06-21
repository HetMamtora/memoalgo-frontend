import { api } from '@/services/api'
import type { ReviewRequest, ReviewResponse, ReviewSessionResponse } from '@/types'

export async function getDueProblems(): Promise<ReviewSessionResponse> {
    const res = await api.get<ReviewSessionResponse>('/reviews/due')
    return res.data
}

export async function SubmitReview(
    problemId: string,
    data: ReviewRequest
): Promise<ReviewResponse> {
    const res = await api.post<ReviewResponse>(`/reviews/${problemId}`, data)
    return res.data
}