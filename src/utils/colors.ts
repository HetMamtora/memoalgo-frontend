// Copied verbatim from the Day 7 design system doc. These are for cases
// where a hex string is required directly in JS (e.g. chart libraries on
// the Stats page, Day 12) -- everything else should use Tailwind classes
// (bg-surface, text-secondary, etc.) which read the same values from the
// CSS variables in index.css.

export const colors = {
  light: {
    bg: '#FAF9F5',
    surface: '#FFFFFF',
    border: '#E5E2D9',
    text: '#211F1C',
    textSecondary: '#6B6862',
    textTertiary: '#78756E',
    accentLink: '#0F6E56',
    accentBtn: '#0F6E56',
    accentBtnText: '#FFFFFF',
    accentBg: '#E1F5EE',
    successBg: '#E1F5EE',
    successText: '#0F6E56',
    warningBg: '#FAEEDA',
    warningText: '#854F0B',
    dangerBg: '#FAECE7',
    dangerText: '#993C1D',
  },
  dark: {
    bg: '#15171C',
    surface: '#1C1F26',
    border: '#2E323C',
    text: '#EDEDEA',
    textSecondary: '#A6A49C',
    textTertiary: '#838783',
    accentLink: '#5DCAA5',
    accentBtn: '#1D9E75',
    accentBtnText: '#06241B',
    accentBg: '#085041',
    successBg: '#085041',
    successText: '#9FE1CB',
    warningBg: '#633806',
    warningText: '#FAC775',
    dangerBg: '#712B13',
    dangerText: '#F5C4B3',
  },
} as const

export type ThemeName = keyof typeof colors
