import { useEffect, useState } from 'react'
import * as statsService from '@/services/stats'
import { extractErrorMessage } from '@/services/api'
import type { StatsResponse } from '@/types'
 
export function useStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
 
  useEffect(() => {
    statsService
      .getStats()
      .then(setStats)
      .catch((err: unknown) => setError(extractErrorMessage(err, 'Could not load stats.')))
      .finally(() => setIsLoading(false))
  }, [])
 
  return { stats, isLoading, error }
}