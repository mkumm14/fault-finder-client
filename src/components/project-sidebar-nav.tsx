"use client"

import { NavLink, useParams } from "react-router-dom"


import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SidebarNavItem } from "@/types";

interface DashboardNavProps {
    items: SidebarNavItem[]
}

export function ProjectSidebarNav({ items }: DashboardNavProps) {



    if (!items?.length) {
        return null
    }

    const { projectId } = useParams()

    // const determineHref = (title: string, projectId: string | undefined) => {
    //     switch (title) {
    //         case "project-dashboard":
    //             return `/project/${projectId}`;
    //         case "bugs":
    //             return `/project/${projectId}/bugs`;
    //         case "report":
    //             return `/project/${projectId}/report/`;
    //         default:
    //             return `/`;
    //     }
    // };



    return (
        <nav className="grid items-start gap-2">
            {items.map((item, index) => {
                const Icon = Icons[item.icon as keyof typeof Icons || "arrowRight"]
                const href = item.href ? item.href.replace(':projectId', projectId || '') : '/';

                console.log(href)


                return (
                    item.href && (
                        <NavLink key={index} className={({ isActive }) =>
                            isActive
                                ? "bg-accent rounded-md"
                                : "transparent"
                        }   end={true} to={item.disabled ? "/" : href}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    item.disabled && "cursor-not-allowed opacity-80"
                                )}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                            </span>
                        </NavLink>





                    )
                )
            })}
        </nav>
    )
}