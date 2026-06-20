import { Badge } from "@/components/common/Badge"
import { DIFFICULTY_LABEL, DIFFICULTY_VARIANT } from "@/utils/difficulty"
import type { ProblemResponse } from "@/types"

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

            {/* NOTE: the spec also calls for a due-date badge here ("colored dot +
          title + difficulty pill + due date"). Omitted deliberately --
          ProblemResponse has no due-date field, and ReviewSessionResponse's
          dueProblems are also plain ProblemResponse objects without one.
          Per-problem next-review-date isn't exposed by any current
          endpoint. Either ProblemResponse needs a nextReviewDate field
          added backend-side, or the Library needs a second call to cross-
          reference against /reviews/due. Worth deciding before Day 11. */}

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