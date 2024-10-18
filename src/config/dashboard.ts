/**
 * Configuration object for the dashboard.
 * 
 * @type {DashboardConfig}
 * 
 * @property {Array<Object>} sidebarNav - Array of navigation items for the sidebar.
 * @property {string} sidebarNav[].title - The title of the navigation item.
 * @property {string} sidebarNav[].href - The URL path the navigation item links to.
 * @property {string} sidebarNav[].icon - The icon associated with the navigation item.
 */
import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
    // mainNav: [
    //     {
    //         title: "Documentation",
    //         href: "/docs",
    //     },
    //     {
    //         title: "Support",
    //         href: "/support",
    //         disabled: true,
    //     },
    // ],
    sidebarNav: [
        {
            title: "dashboard",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "chat",
            href: "/chat",
            icon: "billing",
        },
        {
            title: "Projects",
            href: "/projects",
            icon: "settings",
        },
    ],
}

