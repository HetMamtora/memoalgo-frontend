import { Link } from 'react-router-dom'
import { useAuth } from "@/hooks/useAuth"
import { useStats } from "@/hooks/useStats"
import { StatCard } from '@/components/dashboard/StatCard'
import { EmptyState } from '@/components/common/EmptyState'
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton'
import { WeakestTopics } from '@/components/dashboard/WeekestTopics'

export function Dashboard() {
    const { user } = useAuth()
    const { stats, isLoading, error } = useStats()

    if (isLoading) return <DashboardSkeleton />

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-section text-text">Dashboard</h1>
                <p className="text-body text-text-secondary"> Welcome back, {user?.username}.</p>
            </div>

            {error && <p  className='text-body text-danger-text'>{error}</p>}
            
            {!error && isLoading && (
                <p className='text-body-secondary text-text-tertiary'>Loading Stats...</p>
            )}

            {!error && !isLoading && stats?.totalProblems === 0 && (
                <EmptyState
                    title="Nothing logged yet"
                    body="Add the first problem you've solved to start building your revision schedule."
                    action={
                        <Link
                            to="/app/library"
                            className="rounded-md bg-accent px-4 py-2 text-body-secondary font-medium text-accent-text hover:opacity-90"
                        >
                            Add your first problem
                        </Link>
                    }
                />
            )}

            {!error && !isLoading && stats && stats.totalProblems > 0 && (
                <>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <StatCard label="Due today" value={stats.dueToday} />
                        <StatCard label="Day streak" value={stats.currentStreak} />
                        <StatCard label="Retention" value={`${Math.round(stats.retentionRate)}%`} />
                        <StatCard label="Problems" value={stats.totalProblems} />
                    </div>
    
                    <Link
                        to="/app/review"
                        className="inline-flex w-fit items-center justify-center rounded-md bg-accent px-4 py-2 text-body font-medium text-accent-text hover:opacity-90"
                    >
                        Start review session
                    </Link>

                    <WeakestTopics retentionByTopic={stats.retentionByTopic} />
                </>
            )}
        </div>
    )
}