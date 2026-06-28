import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { BottomNav } from '@/components/layout/BottomNav'

export function AppShell() {
    return (
        <div className="flex h-screen overflow-hidden bg-bg">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-body-secondary focus:font-medium focus:text-accent-text"
            >
                Skip to main content
            </a>

            <Sidebar />

            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader />
                <main
                    id="main-content"
                    className="flex-1 overflow-y-auto px-4 py-6 pb-20 md:px-8 md:py-8 md:pb-8"
                >
                <Outlet />
                </main>

                <BottomNav />
            </div>
        </div>
    )
}