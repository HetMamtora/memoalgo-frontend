import { Badge } from "@/components/common/Badge"
import { DIFFICULTY_LABEL, DIFFICULTY_VARIANT } from "@/utils/difficulty"
import type { ProblemResponse } from "@/types"
import { formatDueDate, isDueOrOverdue } from "@/utils/dates"

interface ProblemCardProps {
    problem: ProblemResponse
    onEdit: () => void
    onDelete: () => void
}

const DOT_CLASSES: Record<ProblemResponse['difficulty'], string> = {
    EASY: 'bg-success-text',
    MEDIUM: 'bg-warning-text',
    HARD: 'bg-danger-text'
}

export function ProblemCard({ problem, onEdit, onDelete }: ProblemCardProps) {
    return (
        <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3">
            <span
                className={`h-2 w-2 flex-shrink-0 rounded-full ${DOT_CLASSES[problem.difficulty]}`}
                aria-hidden="true"
            />

            <div className="flex-1 overflow-hidden">
                <p className="truncate text-body text-text">{problem.title}</p>
                {problem.topicName && (
                    <p className="truncate text-body-secondary text-text-tertiary">{problem.topicName}</p>
                )}
            </div>

            {problem.nextReviewDate && (
                <span
                    className={`flex-shrink-0 text-body-secondary ${
                        isDueOrOverdue(problem.nextReviewDate)
                            ? 'font-medium text-warning-text'
                            : 'text-text-tertiary'
                        }`}
                >
                    {formatDueDate(problem.nextReviewDate)}
                </span>
            )}

            <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]}>
                {DIFFICULTY_LABEL[problem.difficulty]}
            </Badge>

            <div className="flex flex-shrink-0 items-center gap-1">
                <button
                    type="button"
                    onClick={onEdit}
                    className="rounded-md px-2 py-1 text-body-secondary text-text-secondary hover:bg-bg"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="rounded-md px-2 py-1 text-body-secondary text-danger-text hover:bg-danger-bg"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}