interface WeakestTopicsProps {
    retentionByTopic: Record<string, number>
}

export function WeakestTopics({ retentionByTopic }: WeakestTopicsProps) {
    const weakest = Object.entries(retentionByTopic)
        .sort((a,b) => a[1] - b[1])
        .slice(0, 2)
    
    if(weakest.length === 0) return null

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <h2 className="text-card-title text-text">Weakest Topics</h2>
            {weakest.map(([topic, rate]) => (
                <div key={topic} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-body-secondary text-text-secondary">
                        <span>{topic}</span>
                        <span>{Math.round(rate)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-bg">
                        {/* Math.max(..., 4) keeps a sliver visible even at 0% rather than rendering an invisible bar. */}
                        <div
                            className="h-full rounded-full bg-warning-text"
                            style={{width: `Math.max(rate, 4)%`}}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}