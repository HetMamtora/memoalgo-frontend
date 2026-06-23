import { Skeleton } from '@/components/common/Skeleton'

export function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
                    >
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>
        </div>
    )
}