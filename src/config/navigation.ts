import { type ComponentType } from "react"
import { IconDashboard, IconLibrary, IconReview, IconStats, type IconProps} from "@/components/common/icons"

export interface NavItem {
    label: string
    path: string
    icon: ComponentType<IconProps>
    /** Exact-match only -- otherwise "/app" would also show active on "/app/library" etc. */
    end?: boolean
}

export const NAV_ITEMS: NavItem[] = [
    {label: 'Dashboard', path: '/app', icon:IconDashboard, end: true},
    {label: 'Library', path: '/app/library', icon: IconLibrary},
    {label: 'Review', path: '/app/review', icon: IconReview},
    {label: 'Stats', path: '/app/stats', icon: IconStats},
]