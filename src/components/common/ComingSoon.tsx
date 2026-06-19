interface ComingSoonProps {
    title: string
    day: number
}

export function ComingSoon({ title, day } : ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
            <h1 className="text-selection text-text">{title}</h1>
            <p className="text-body-secondary text-text-tertiary">Coming on Day {day}.</p>
        </div>
    )
}