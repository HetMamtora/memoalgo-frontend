import { createContext, useEffect, useState, type ReactNode} from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

export interface ThemeContextValue {
    /** What the user picked: 'light' | 'dark' | 'system'. */
    theme: ThemePreference
    /** What's actually applied right now -- 'system' resolves to one of these. */
    resolvedTheme: ResolvedTheme
    setTheme: (theme: ThemePreference) => void
}

const STORAGE_KEY = 'theme'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function systemPrefersDark(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readStoredTheme(): ThemePreference {
    try{
        const stored = localStorage.getItem(STORAGE_KEY)
        if(stored === 'light' || stored === 'dark' || stored === 'system')
            return stored
    } catch {

    }
    return 'system'
}

function resolve(theme: ThemePreference): ResolvedTheme {
    return theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme
}

export function ThemeProvider({ children } : {children: ReactNode}){
    const [theme, setThemeState] = useState<ThemePreference>(readStoredTheme)
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolve(readStoredTheme()))

    // Keep <html class="dark"> in sync with resolvedTheme. The inline script
  // in index.html already set this once, before paint -- this effect is
  // what keeps it correct afterwards (e.g. the user flips the toggle).
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  // While the preference is "system", stay reactive to OS-level changes
  // without requiring a page reload.
  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setResolvedTheme(systemPrefersDark() ? 'dark' : 'light')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [theme])

  function setTheme(next: ThemePreference) {
    setThemeState(next)
    setResolvedTheme(resolve(next))
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Worst case the choice doesn't survive a refresh -- not a crash.
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}