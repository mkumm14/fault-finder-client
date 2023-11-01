import {  ProjectConfig } from "@/types"

export const ProjectPageConfig: ProjectConfig = {
    mainNav: [
        {
            title: "Documentation",
            href: "/docs",
        },
        {
            title: "Support",
            href: "/support",
            disabled: true,
        },
    ],


    sidebarNav: [
        {
            title: "bugs",
            href: "/bugs",
            icon: "post",
        },
        {
            title: "report",
            href: "/report",
            icon: "billing",
        },

    ],


 
}