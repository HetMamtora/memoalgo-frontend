/**
 * Parses a "YYYY-MM-DD" string (a backend LocalDate) into a local Date at
 * midnight. Deliberately NOT `new Date(dateStr)` -- the built-in ISO
 * parser treats date-only strings as UTC midnight, which silently shifts
 * to the previous day once converted to local time in any timezone west
 * of UTC. Splitting and constructing manually avoids that entirely.
 */
function parseLocalDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
}

function startOfToday(): Date {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}

/** True if the given LocalDate string is today or in the past. */
export function isDueOrOverdue(dateStr: string): boolean {
    return parseLocalDate(dateStr).getTime() <= startOfToday().getTime()
}

/** Human-readable due-date label: "Overdue", "Due today", "Due in 3 days", etc. */
export function formatDueDate(dateStr: string): string {
    const diffDays = Math.round(
        (parseLocalDate(dateStr).getTime() - startOfToday().getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays < 0)
        return 'Overdue'
    if (diffDays === 0)
        return 'Due today'
    if (diffDays === 1)
        return 'Due tomorrow'
    
    return `Due in ${diffDays} days`
}