import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileHeader } from "@/components/layout/MobileHeader"
import { BottomNav } from "@/components/layout/BottomNav"

export function AppShell() {
    return (
        <div className="flex min-h-screen bg-bg">
            <Sidebar />

            <div className="flex min-h-screen flex-1 flex-col">
                <MobileHeader />

                {/* pb-20 on mobile clears the fixed BottomNav; not needed on desktop. */}
                <main className="flex-1 px-4 py-6 pb-20 md:px-8 md:pb-8">
                    <Outlet />
                </main>

                <BottomNav />
            </div>
        </div>
    )
}