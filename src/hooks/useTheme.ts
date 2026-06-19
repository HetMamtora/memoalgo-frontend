import { useContext } from "react"
import { ThemeContext, type ThemeContextValue } from "@/context/ThemeContext"

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext)
    if(ctx === undefined){
        throw new Error('useTheme must be within a <ThemeProvider>')
    }
    return ctx
}