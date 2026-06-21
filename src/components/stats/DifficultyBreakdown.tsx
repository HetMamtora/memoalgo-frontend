interface DiffucultyBreakdownProps {
    problemsByDifficulty: Record<string, number>
}

const ITEMS: { key: string; label: string; bgClass: string; textClass: string }[] = [
    { key:'EASY' , label:'Easy' , bgClass:'bg-success-bg' , textClass:'text-success-text' },
    { key:'MEDIUM' , label:'Medium' , bgClass:'bg-warning-bg' , textClass:'text-warning-text' },
    { key:'HARD' , label:'Hard' , bgClass:'bg-danger-bg' , textClass:'text-danger-text' },
]

export function DifficultyBreakdown({ problemsByDifficulty }: DiffucultyBreakdownProps) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
            <h2 className="text-card-title text-text">By difficulty</h2>
            <div  className="grid grid-cols-3 gap-3">
                {ITEMS.map(({ key, label, bgClass, textClass}) => (
                    <div
                        key={key}
                        className={`flex flex-col items-center gap-1 rounded-md p-3 ${bgClass}`}
                    >
                        <span className={`text-section font-medium ${textClass}`}>
                            {problemsByDifficulty[key] ?? 0}
                        </span>
                        <span className={`text-caption ${textClass} opacity-80`}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}