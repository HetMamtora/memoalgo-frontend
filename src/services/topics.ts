import { api } from '@/services/api'
import type { TopicResponse } from '@/types'

export async function getAll(): Promise<TopicResponse[]> {
    const res = await api.get<TopicResponse[]>('/topics')
    return res.data
}