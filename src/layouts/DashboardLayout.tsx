/**
 * DashboardLayout component is the main layout for the dashboard section of the application.
 * It includes a header with navigation and user account controls, and a main content area
 * that can be collapsed or expanded.
 *
 * @component
 * @example
 * // Usage example
 * <DashboardLayout />
 *
 * @returns {JSX.Element} The rendered DashboardLayout component.
 *
 * @remarks
 * - The layout consists of a header and a main content area.
 * - The header includes the main navigation, a mode toggle button, and user account navigation.
 * - The main content area includes a sidebar navigation that can be collapsed or expanded.
 *
 * @function
 * @name DashboardLayout
 *
 * @hook
 * @name useState
 * @description Manages the collapsed state of the sidebar.
 *
 * @param {boolean} isCollapsed - State to determine if the sidebar is collapsed.
 * @param {Function} setIsCollapsed - Function to toggle the collapsed state of the sidebar.
 */
import { dashboardConfig } from "@/config/dashboard"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/sidebar-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";


export default function DashboardLayout() {


    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                        <MainNav items={dashboardConfig.sidebarNav} />

                        {/* <button onClick={() => setIsCollapsed(!isCollapsed)}>
                            {isCollapsed ? "Expand" : "Collapse"}
                        </button> */}

                        <div className="hidden md:block">

                            <Button variant="outline" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
                                {isCollapsed ? <Icons.chevronLeft className="h-4 w-4" /> : <Icons.chevronRight className="h-4 w-4" />}
                            </Button>

                        </div>

                    </div>
                    <div className={'flex items-center space-x-5'}>
                        <ModeToggle />
                        <UserAccountNav
                            user={{
                                name: null,
                                image: null,
                                email: null,
                            }}
                        />
                    </div>
                </div>
            </header>
            <div className={`container grid flex-1 gap-12 ${isCollapsed ? 'md:grid-cols-1' : 'md:grid-cols-[200px_1fr]'}`}>
                <aside className={`hidden w-[200px] flex-col md:flex ${isCollapsed ? 'md:hidden' : ''}`}>
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}


