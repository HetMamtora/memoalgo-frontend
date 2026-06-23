import { Skeleton } from '@/components/common/Skeleton'

export function LibrarySkeleton() {
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3"
                >
                    <Skeleton className="h-2 w-2 flex-shrink-0 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-5 w-16 flex-shrink-0 rounded-full" />
                </div>
            ))}
        </div>
    )
}