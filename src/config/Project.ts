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
            title: "project-dashboard",
            href: "/project/:projectId",
            icon: "billing",
        },
        {
            title: "bugs",
            href:"/project/:projectId/bugs",
            icon: "post",
        },
        {
            title: "report",
            href: "/project/:projectId/report",
            icon: "billing",
        },

    ],


 
}