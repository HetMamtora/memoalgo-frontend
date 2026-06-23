import { Link } from 'react-router-dom'
import { useStats } from '@/hooks/useStats'
import { StatCard } from '@/components/dashboard/StatCard'
import { TopicsChart } from '@/components/stats/TopicsChart'
import { DifficultyBreakdown } from '@/components/stats/DifficultyBreakdown'
import { ActivityHeatmap } from '@/components/stats/ActivityHeatmap'
import { StatsSkeleton } from '@/components/stats/StatsSkeleton'
import { EmptyState } from '@/components/common/EmptyState'

export function Stats() {

    const { stats, isLoading, error } = useStats()

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-section text-text'>Stats</h1>

            {error && <p className='text-body text-danger-text'>{error}</p>}

            {!error && isLoading && <StatsSkeleton />}

            {!error && !isLoading && stats && stats.totalReviews === 0 && (
                <EmptyState
                    title='Not enough data yet'
                    body='Complete a few review sessions and your stats will start showing up here'
                    action={
                        <Link
                            to='/app/review'
                            className='rounded-md bg-accent px-4 py-2 text-body-secondary font-medium text-accent-text hover:opacity-90'
                        >
                            Start reviewing
                        </Link>
                    }
                />
            )}

            {!error && !isLoading && stats && stats.totalReviews > 0 && (
                <>
                    <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                        <StatCard label='Retention Rate' value={`${Math.round(stats.retentionRate)}%`} accent />
                        <StatCard label='Day Streak' value={stats.currentStreak} />
                        <StatCard label='Total Reviews' value={stats.totalReviews} />
                    </div>

                    <TopicsChart problemsByTopic={stats.problemsByTopic} />

                    <div className='grid gap-6 md:grid-cols-2'>
                        <DifficultyBreakdown problemsByDifficulty={stats.problemsByDifficulty} />
                        <ActivityHeatmap reviewsByDay={stats.reviewsByDay} />
                    </div>
                </>
            )}
        </div>
    )
}