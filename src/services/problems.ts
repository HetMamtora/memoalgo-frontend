import { api } from '@/services/api'
import type { ProblemFilters, ProblemRequest, ProblemResponse } from '@/types'

export async function getAll(filters: ProblemFilters = {}): Promise<ProblemResponse[]> {
    const res = await api.get<ProblemResponse[]>('/problems', { params: filters })
    return res.data
}

export async function getById(id: string): Promise<ProblemResponse> {
    const res = await api.get<ProblemResponse>(`/problems/${id}`)
    return res.data
}
 
export async function create(data: ProblemRequest): Promise<ProblemResponse> {
    const res = await api.post<ProblemResponse>('/problems', data)
    return res.data
}
 
export async function update(id: string, data: ProblemRequest): Promise<ProblemResponse> {
    const res = await api.put<ProblemResponse>(`/problems/${id}`, data)
    return res.data
}

export async function remove(id: string): Promise<void> {
  await api.delete(`/problems/${id}`)
}