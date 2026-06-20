interface StatCardProps {
    label: string
    value: string | number
}

export function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-4">
            <span className="text-hero text-text">{value}</span>
            <span className="text-body-secondary text-text-tertiary">{label}</span>
        </div>
    )
}