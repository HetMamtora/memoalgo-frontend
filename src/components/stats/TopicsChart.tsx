interface TopicsChartProps {
    problemsByTopic: Record<string, number>
}

export function TopicsChart({ problemsByTopic }: TopicsChartProps) {
    const entries = Object.entries(problemsByTopic).sort((a, b) => b[1] - a[1])

    if(entries.length === 0) return null

    const max = entries[0][1]

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <h2 className="text-card-title text-text">Problems by topic</h2>
            <div className="flex h-36 items-end gap-3">
                {entries.map(([topic, count]) => (
                    <div key={topic} className="flex flex-1 flex-col items-center gap-2">
                        <div 
                            title={`${topic}: ${count}`}
                            className="w-full rounded-t-md bg-accent-bg"
                            style={{ height: `${Math.max((count / max) * 100, 8)}%` }}
                        />
                            <span className="truncate text-caption text-text-tertiary">{topic}</span>
                    </div> 
                ))}
            </div>
        </div>
    )
}