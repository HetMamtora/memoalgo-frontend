import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { DIFFICULTY_LABEL } from '@/utils/difficulty'
import { extractErrorMessage } from '@/services/api'
import type { Difficulty, ProblemRequest, ProblemResponse, TopicResponse } from '@/types'

interface ProblemFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ProblemRequest) => Promise<unknown>
    topics: TopicResponse[]
    /** Present = editing that problem. Null/undefined = adding a new one. */
    initialValue?: ProblemResponse | null
}

const DIFFICULTIES: Difficulty[] = ['EASY', 'MEDIUM', 'HARD']

const EMPTY_FORM = {
    title: '',
    url: '',
    difficulty: 'MEDIUM' as Difficulty,
    topicId: '',
    notes: '',
    tags: [] as string[],
}

export function ProblemFormModal({
    isOpen,
    onClose,
    onSubmit,
    topics,
    initialValue,
}: ProblemFormModalProps) {
        const [form, setForm] = useState(() =>
        initialValue
        ? {
            title: initialValue.title,
            url: initialValue.url ?? '',
            difficulty: initialValue.difficulty,
            topicId: initialValue.topicId ?? '',
            notes: initialValue.notes ?? '',
            tags: initialValue.tags,
        }
      : EMPTY_FORM
    )
  
    const [tagInput, setTagInput] = useState('')
    const [titleError, setTitleError] = useState<string | undefined>()
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditing = Boolean(initialValue)

    function addTag() {
        const trimmed = tagInput.trim()
        if (!trimmed || form.tags.includes(trimmed)) {
            setTagInput('')
            return
        }
        setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
        setTagInput('')
    }

    function removeTag(tag: string) {
        setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
    }

    function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addTag()
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setFormError(null)

        if (!form.title.trim()) {
            setTitleError('Title is required')
            return
        }
        setTitleError(undefined)

        setIsSubmitting(true)
        try {
            await onSubmit({
                title: form.title.trim(),
                url: form.url.trim() || null,
                difficulty: form.difficulty,
                notes: form.notes.trim() || null,
                topicId: form.topicId || null,
                tags: form.tags,
            })
            onClose()
        } catch (err) {
            setFormError(extractErrorMessage(err))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit problem' : 'Add problem'}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <Input
                    label="Title"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    error={titleError}
                />

                <Input
                    label="URL"
                    type="url"
                    placeholder="https://leetcode.com/problems/..."
                    value={form.url}
                    onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
                />

                <div className="flex flex-col gap-1">
                    <span className="text-label text-text-secondary">Difficulty</span>
                    <div className="flex gap-2">
                        {DIFFICULTIES.map((d) => {
                            const active = form.difficulty === d
                            return (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, difficulty: d }))}
                                    className={`flex-1 rounded-md border px-2 py-1.5 text-body-secondary font-medium transition-colors ${
                                                active
                                                ? 'border-accent-link bg-accent-bg text-accent-link'
                                                : 'border-border text-text-secondary hover:bg-bg'
                                            }`}
                                >
                                    {DIFFICULTY_LABEL[d]}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="problem-topic" className="text-label text-text-secondary">
                        Topic
                    </label>
                    <select
                        id="problem-topic"
                        value={form.topicId}
                        onChange={(e) => setForm((prev) => ({ ...prev, topicId: e.target.value }))}
                        className="rounded-md border border-border bg-surface px-3 py-2 text-[16px] text-text md:text-body"
                    >
                        <option value="">No topic</option>
                            {topics.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="problem-tags" className="text-label text-text-secondary">
                        Tags
                    </label>
                    <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1.5">
                        {form.tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 rounded-full bg-accent-bg px-2 py-0.5 text-caption text-accent-link"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    aria-label={`Remove ${tag}`}
                                    className="hover:text-danger-text"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                        <input
                            id="problem-tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            onBlur={addTag}
                            placeholder={form.tags.length === 0 ? 'Type and press Enter' : ''}
                            className="min-w-[100px] flex-1 bg-transparent text-[16px] text-text outline-none placeholder:text-text-tertiary md:text-body"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="problem-notes" className="text-label text-text-secondary">
                        Notes
                    </label>
                    <textarea
                        id="problem-notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                        className="rounded-md border border-border bg-surface px-3 py-2 text-[16px] text-text placeholder:text-text-tertiary md:text-body"
                    />
                </div>

                {formError && (
                    <p role="alert" className="text-caption text-danger-text">
                        {formError}
                    </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}>
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    )
}