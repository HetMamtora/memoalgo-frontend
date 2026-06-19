import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/config/navigation'

export function BottomNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 flex h-14 items-stretch border-t border-border bg-surface md:hidden"
    >
      {NAV_ITEMS.map(({ label, path, icon: Icon, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-0.5 text-label ${
              isActive ? 'text-accent-link' : 'text-text-tertiary'
            }`
          }
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}