"use client"

import { Link, NavLink } from "react-router-dom"


import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SidebarNavItem } from "@/types";

interface DashboardNavProps {
    items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {

    if (!items?.length) {
        return null
    }

    return (
        <nav className="grid items-start gap-2">
            {items.map((item, index) => {
                const Icon = Icons[item.icon || "arrowRight"]
                return (
                    item.href && (
                        <NavLink key={index} className={({ isActive, isPending }) =>
                            isActive
                                ? "bg-accent"
                                    : "transparent"
                        } to={item.disabled ? "/" : item.href}>
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