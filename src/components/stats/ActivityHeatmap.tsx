interface ActivityHeatmapProps {
    reviewsByDay: Record<string, number>
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** Map a raw review count to an intensity level 0-4. */
function intensity(count: number): number {
    if (count === 0) return 0
    if (count <= 1) return 1
    if (count <= 3) return 2
    if (count <= 5) return 3
    return 4
}

/**
 * Teal shades per intensity level, with separate light/dark values via
 * CSS variables so they fit the page without looking washed out or
 * too saturated in either theme.
 */
const INTENSITY_CLASSES: string[] = [
    'bg-bg',                                       // 0 — empty
    'bg-[#c5ece0] dark:bg-[#0a3d30]',              // 1
    'bg-[#85d9bc] dark:bg-[#0d5e49]',              // 2
    'bg-[#3fbf94] dark:bg-[#148c63]',              // 3
    'bg-[#0f6e56] dark:bg-[#1d9e75]',              // 4
]

/**
 * Build 35 cells arranged so the grid reads:
 *   - 7 rows = Mon → Sun
 *   - 5 columns = weeks, most recent week on the right
 *
 * CSS grid with grid-auto-flow: column does the layout — we emit cells
 * in column-major order (all 7 days of the oldest week first, then the
 * next week, etc.) and the grid wraps them into the right shape.
 */
function buildCells(reviewsByDay: Record<string, number>) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // dayOfWeek: 0 = Mon, 6 = Sun (JS getDay() returns 0 = Sun)
    const jsDow = today.getDay()
    const dayOfWeek = jsDow === 0 ? 6 : jsDow - 1

    // End of heatmap = today's position in its week column.
    // Total cells back = 4 full weeks before this one + days elapsed this week + today.
    const totalDaysBack = 4 * 7 + dayOfWeek // 0-indexed from the oldest cell

    const cells: { dateStr: string; count: number; level: number }[] = []

    for (let i = totalDaysBack; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)

        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        const dateStr = `${yyyy}-${mm}-${dd}`

        const count = reviewsByDay[dateStr] ?? 0
        cells.push({ dateStr, count, level: intensity(count) })
    }

    // Pad the end with empty cells so the last column is always complete
    // (7 cells). Without this, if today is e.g. Wednesday, the last column
    // would only have 4 cells and the grid-auto-flow would misalign.
    while (cells.length % 7 !== 0) {
        cells.push({ dateStr: '', count: 0, level: 0 })
    }

    return cells
}

export function ActivityHeatmap({ reviewsByDay }: ActivityHeatmapProps) {
  const cells = buildCells(reviewsByDay)

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-card-title text-text">Activity, last 5 weeks</h2>

        <div className="flex gap-2">
            {/* Day labels (Mon-Sun) */}
            <div className="flex flex-col gap-[3px] pt-0">
                {DAY_LABELS.map((label, i) => (
                    <span
                        key={label}
                        className={`flex h-3 items-center text-[10px] leading-none text-text-tertiary ${i % 2 === 0 ? '' : 'invisible'}`}
                    >
                        {label}
                    </span>
                ))}
            </div>

            {/* Grid: 7 rows, auto columns, column-major fill */}
            <div
                className="grid flex-1 gap-[3px]"
                style={{
                    gridTemplateRows: 'repeat(7, 12px)',
                    gridAutoFlow: 'column',
                    gridAutoColumns: '1fr',
                }}
            >
                {cells.map((cell, idx) => (
                    <div
                        key={idx}
                        title={cell.dateStr ? `${cell.dateStr}: ${cell.count} reviews` : ''}
                        className={`rounded-sm ${INTENSITY_CLASSES[cell.level]}`}
                    />
                ))}
            </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 text-[10px] text-text-tertiary">
            <span>Less</span>
            {INTENSITY_CLASSES.map((cls, i) => (
                <div key={i} className={`h-3 w-3 rounded-sm ${cls}`} />
            ))}
            <span>More</span>
        </div>
    </div>
  )
}