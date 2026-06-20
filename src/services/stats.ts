import { api } from '@/services/api'
import type { StatsResponse } from '@/types'

export async function getStats(): Promise<StatsResponse> {
    const res = await api.get<StatsResponse>('/stats')
    return res.data
}