interface LogoProps {
  size?: 'sm' | 'md'
}

const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'text-[13px]',
  md: 'text-[16px]',
}

export function Logo({ size = 'md' }: LogoProps) {
  return (
    <span className={`font-medium ${sizeClasses[size]}`}>
      <span className="text-text">Memo</span>
      <span className="text-accent-link">Algo</span>
    </span>
  )
}
