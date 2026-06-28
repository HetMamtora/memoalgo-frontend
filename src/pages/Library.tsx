import { useMemo, useState, type ReactNode } from 'react'
import { useProblems } from '@/hooks/useProblems'
import { useTopics } from '@/hooks/useTopics'
import { ProblemCard } from '@/components/library/ProblemCard'
import { ProblemFormModal } from '@/components/library/ProblemFormModal'
import { LibrarySkeleton } from '@/components/library/LibrarySkeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import type { Difficulty, ProblemRequest, ProblemResponse } from '@/types'
 
const DIFFICULTY_FILTERS: {label: string; value: Difficulty | undefined}[] = [
    {label:'All' , value:undefined },
    {label:'Easy' , value:'EASY' },
    {label:'Medium' , value:'MEDIUM' },
    {label:'Hard' , value:'HARD' },
]

export function Library() {

    const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined)
    const [topicId, setTopicId] = useState<string | undefined>(undefined)
    const [search, setSearch] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editingProblem, setEditingProblem] = useState<ProblemResponse | null>(null)
    
    const { topics } = useTopics()
    const { problems, isLoading, error, createProblem, updateProblem, deleteProblem } = useProblems(difficulty, topicId)

    // Search is client-side only -- GET /api/v1/problems supports
    // difficulty/topicId query params but not a free-text search param, so
    // there's nothing to send the backend here. Fine at this app's scale.
  
    const visibleProblems = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return problems
            return problems.filter((p) => p.title.toLowerCase().includes(q))
        }, [problems, search])
 
    function openAddModal() {
        setEditingProblem(null)
        setModalOpen(true)
    }
 
    function openEditModal(problem: ProblemResponse) {
        setEditingProblem(problem)
        setModalOpen(true)
    }

    async function handleSubmit(data: ProblemRequest) {
        if (editingProblem) {
            await updateProblem(editingProblem.id, data)
        } else {
            await createProblem(data)
        }
    }
 
    async function handleDelete(problem: ProblemResponse) {
        // A plain window.confirm rather than a styled confirmation modal --
        // pragmatic for Day 10's scope. Worth upgrading to something on-brand
        // if delete ends up being a frequent action.
        if (!window.confirm(`Delete "${problem.title}"? This can't be undone.`)) return
        await deleteProblem(problem.id)
    }

    return (
        <div className='flex h-full flex-col gap-4 overflow-hidden'>
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-section text-text">Problem Library</h1>
                <Button type="button" onClick={openAddModal}>
                    + Add problem
                </Button>
            </div>

            <Input
                label="Search"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
                {DIFFICULTY_FILTERS.map(({ label, value }) => (
                    <FilterPill key={label} active={difficulty === value} onClick={() => setDifficulty(value)}>
                        {label}
                    </FilterPill>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <FilterPill active={topicId === undefined} onClick={() => setTopicId(undefined)}>
                    All topics
                </FilterPill>
                    
                {topics.map((t) => (
                    <FilterPill key={t.id} active={topicId === t.id} onClick={() => setTopicId(t.id)}>
                        {t.name}
                    </FilterPill>
                ))}
            </div>

            {error && <p className="text-body text-danger-text">{error}</p>}
 

            <div className='flex-1 overflow-y-auto'>
                {!error && isLoading && <LibrarySkeleton />}

                {!error && !isLoading && visibleProblems.length === 0 && (
                    <EmptyState
                        title="No problems here yet"
                        body="Add a problem you've solved and MemoAlgo will start scheduling its reviews."
                        action={
                            <Button type="button" onClick={openAddModal}>
                                Add your first problem
                            </Button>
                        }
                    />
                )}

                {!error && !isLoading && visibleProblems.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {visibleProblems.map((problem) => (
                            <ProblemCard
                                key={problem.id}
                                problem={problem}
                                onEdit={() => openEditModal(problem)}
                                onDelete={() => handleDelete(problem)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {modalOpen && (
                <ProblemFormModal
                    key={editingProblem?.id ?? 'new'}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleSubmit}
                    topics={topics}
                    initialValue={editingProblem}
                />
            )}
        </div>
    )
}

function FilterPill({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: ReactNode
}) {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`rounded-full border px-3 py-1 text-body-secondary transition-colors ${
                active
                    ? 'border-accent-link bg-accent-bg text-accent-link'
                    : 'border-border text-text-secondary hover:bg-bg'
                }`
            }
        >
            {children}
        </button>
    )
}