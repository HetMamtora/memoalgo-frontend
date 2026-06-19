import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { IconLogOut } from "@/components/common/icons";
import { useAuth } from "@/hooks/useAuth";

export function MobileHeader() {
    const { logout } = useAuth()

    return (
        <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
            <Logo size="sm" />
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                    type="button"
                    onClick={logout}
                    aria-label="Log out"
                    title="Log out"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-text-teritary hover:text-danger-text"
                >
                    <IconLogOut className="h-4 w-4" />
                </button>
            </div>
        </header>
    )
}