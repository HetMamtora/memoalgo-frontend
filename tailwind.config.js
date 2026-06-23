/** @type {import('tailwindcss').Config} */
export default {
  
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      
      colors: {
        bg: 'var(--ma-bg)',
        surface: 'var(--ma-surface)',
        border: 'var(--ma-border)',
        text: {
          DEFAULT: 'var(--ma-text)',
          secondary: 'var(--ma-text-secondary)',
          tertiary: 'var(--ma-text-tertiary)',
        },
        accent: {
          DEFAULT: 'var(--ma-accent-btn)',
          link: 'var(--ma-accent-link)',
          text: 'var(--ma-accent-btn-text)',
          bg: 'var(--ma-accent-bg)',
        },
        success: {
          bg: 'var(--ma-success-bg)',
          text: 'var(--ma-success-text)',
        },
        warning: {
          bg: 'var(--ma-warning-bg)',
          text: 'var(--ma-warning-text)',
        },
        danger: {
          bg: 'var(--ma-danger-bg)',
          text: 'var(--ma-danger-text)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        hero: ['26px', { lineHeight: '1.25', fontWeight: '500' }],
        section: ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'card-title': ['15px', { lineHeight: '1.4', fontWeight: '500' }],
        subtitle: ['14px', { lineHeight: '1.4' }],
        body: ['13px', { lineHeight: '1.5' }],
        'body-secondary': ['12.5px', { lineHeight: '1.5' }],
        tertiary: ['12px', { lineHeight: '1.5' }],
        caption: ['11.5px', { lineHeight: '1.4' }],
        label: ['11px', { lineHeight: '1.3' }],
      },
    },
  },
  plugins: [],
}
