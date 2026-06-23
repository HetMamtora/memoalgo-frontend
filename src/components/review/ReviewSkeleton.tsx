import { Skeleton } from '@/components/common/Skeleton'

export function ReviewSkeleton() {
    return (
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-6">
            <Skeleton className="h-1.5 w-full rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-24" />
                </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}