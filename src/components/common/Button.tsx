import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  isLoading?: boolean
}

const base =
  'inline-flex items-center justify-center rounded-md text-body font-medium ' +
  'px-4 py-2 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-text hover:opacity-90',
  secondary:
    'bg-transparent border border-border text-text hover:bg-surface',
}

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
