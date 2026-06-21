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
            <div className="flex flex-col gap-2">
                {entries.map(([topic, count]) => (
                    <div key={topic} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-body-secondary">
                            <span className="text-text-secondary">{topic}</span>
                            <span className="text-text-tertiary">{count}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-bg">
                            <div
                                className="h-full rounded-full bg-accent transition-all duration-300"
                                style={{ width: `${(count / max) * 100}%` }}
                            />
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    )
}