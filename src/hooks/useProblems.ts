import type { Difficulty, ProblemRequest, ProblemResponse } from "@/types";
import * as problemsService from '@/services/problems'
import { useCallback, useEffect, useState } from "react";
import { extractErrorMessage } from "@/services/api";

export function useProblems(difficulty?: Difficulty, topicId?: string) {
    const [problems, setProblems] = useState<ProblemResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProblems = useCallback(() => {
        setIsLoading(true)
        setError(null)
        
        return problemsService
            .getAll({difficulty, topicId})
            .then(setProblems)
            .catch((err: unknown) => setError(extractErrorMessage(err, 'Could not load problems.')))
            .finally(() => setIsLoading(false))
    }, [difficulty, topicId])

    useEffect(() => {
        void Promise.resolve().then(() => fetchProblems())
    }, [fetchProblems])

    async function createProblem(data: ProblemRequest) {
        await problemsService.create(data)
        await fetchProblems()
    }

    async function updateProblem(id: string, data: ProblemRequest) {
        await problemsService.update(id, data)
        await fetchProblems()
    }

    async function deleteProblem(id: string) {
        await problemsService.remove(id)
        await fetchProblems()
    }

    return {
        problems,
        isLoading,
        error,
        refetch: fetchProblems,
        createProblem,
        updateProblem,
        deleteProblem,
    }
}