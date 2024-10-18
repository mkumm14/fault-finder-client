/**
 * ProjectLayout component is the main layout for the project pages.
 * It includes a header with navigation and user account controls, 
 * and a main content area with a collapsible sidebar.
 *
 * @component
 * 
 * @example
 * <ProjectLayout />
 *
 * @returns {JSX.Element} The rendered ProjectLayout component.
 *
 * @remarks
 * The layout consists of a header and a main content area. The header contains
 * the main navigation, a button to toggle the sidebar, a mode toggle, and user account navigation.
 * The main content area includes a collapsible sidebar and a main section where nested routes are rendered.
 *
 * @function
 * @name ProjectLayout
 */
import { MainNav } from "@/components/main-nav"
import { ProjectSidebarNav } from "@/components/project-sidebar-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";
import { ProjectPageConfig } from "@/config/Project";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";


export default function ProjectLayout() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">

                    <div className="flex items-center space-x-4">

                        <MainNav items={ProjectPageConfig.mainNav} />


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
                    <ProjectSidebarNav items={ProjectPageConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

