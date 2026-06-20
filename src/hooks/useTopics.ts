import { extractErrorMessage } from "@/services/api";
import type { TopicResponse } from "@/types";
import * as topicsService from '@/services/topics'
import { useEffect, useState } from "react";


export function useTopics() {
    const [topics, setTopics] = useState<TopicResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        topicsService
            .getAll()
            .then(setTopics)
            .catch((err: unknown) => setError(extractErrorMessage(err, 'Could not load topics.')))
            .finally(() => setIsLoading(false))
    }, [])

    return { topics, isLoading, error}
}