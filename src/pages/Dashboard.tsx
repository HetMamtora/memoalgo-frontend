import { useAuth } from "@/hooks/useAuth";

export function Dashboard() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-section text-text">Dashboard</h1>
            <p className="text-body text-text-secondary">
                Signed in as <span className="font-medium text-text">{user?.username}</span> ({user?.email})
            </p>
            <p className="text-body-secondary text-text-tertiary">
                Stats cards, due-today count, and streak land on Day 10.
            </p>
        </div>
    )
}