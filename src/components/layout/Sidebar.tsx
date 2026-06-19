import { NavLink } from "react-router-dom"
import { Logo } from "@/components/common/Logo"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { IconLogOut } from "@/components/common/icons"
import { NAV_ITEMS } from "@/config/navigation"
import { useAuth } from "@/hooks/useAuth"

export function Sidebar(){
    const { user, logout} = useAuth()

    return(
        <aside className="hidden w-[140px] flex-shrink-0 flex-col border-r border-border bg-surface px-3 py-4 md:flex">
            <div className="px-1 pb-6">
                <Logo size="sm" />
            </div>

            <nav className="flex flex-1 flex-col gap-1" aria-label="Main">
                {NAV_ITEMS.map(({ label, path, icon: Icon, end }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-md px-2 py-2 text-body-secondary ${
                            isActive
                                ? 'bg-accent-bg font-medium text-accent-link'
                                : 'text-text-secondary hover:bg-bg'
                            }`
                        }
                    >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-border pt-3">
                <ThemeToggle />
                <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-bg text-caption font-medium text-accent-link">
                        {user?.username.charAt(0).toUpperCase()}
                    </span>
                    <span
                        className="flex-1 truncate text-body-secondary text-text"
                        title={user?.username}
                    >
                        {user?.username}
                    </span>
                    <button
                        type="button"
                        onClick={logout}
                        aria-label="Log out"
                        title="Log out"
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-text-tertiary hover:bg-bg hover: text-danger-text"
                    >
                        <IconLogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    )
}