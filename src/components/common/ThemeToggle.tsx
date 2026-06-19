import { type ComponentType } from "react"
import { useTheme } from "@/hooks/useTheme"
import type { ThemePreference } from "@/context/ThemeContext"
import { IconMonitor, IconMoon, IconSun, type IconProps } from "@/components/common/icons"

const OPTIONS: { value: ThemePreference; label: string; Icon: ComponentType<IconProps> }[] = [
    {value: 'system', label: 'System', Icon: IconMonitor},
    {value: 'light', label: 'Light', Icon: IconSun},
    {value: 'dark', label: 'Dark', Icon: IconMoon},
    
]

export function ThemeToggle() {
    const { theme, setTheme} = useTheme()

    return (
        <div
            role="radiogroup"
            aria-label="Theme"
            className="inline-flex rounded-md border border-border p-0.5"
        >
            {OPTIONS.map(({value, label, Icon}) => {
                const active = theme === value
                return (
                    <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={label}
                        title={label}
                        onClick={() => setTheme(value)}
                        className={`flex h-7 w-7 items-center justify-center rounded-sm transition-colors
                            ${active ? 'bg-accent-bg text-accent-link' : 'text-text-tertiary hover:text-text-secondary'}`}
          >
            <Icon className="h-4 w-4" />
          </button>
                )
            })}
        </div>
        
    )
}
