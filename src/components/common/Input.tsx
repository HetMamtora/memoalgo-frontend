import { useId, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, id, className = '', ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-label text-text-secondary">
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-md border bg-surface px-3 py-2 text-[16px] text-text md:text-body
          placeholder:text-text-tertiary
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-link
          ${error ? 'border-danger-text' : 'border-border'} ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId ?? hintId}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-caption text-text-tertiary">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-danger-text">
          {error}
        </p>
      )}
    </div>
  )
}