/**
 * Configuration object for the Project Page.
 * 
 * @type {ProjectConfig}
 * 
 * @property {Array<{title: string, href: string, disabled?: boolean}>} mainNav - The main navigation links.
 * @property {Array<{title: string, href: string, icon: string}>} sidebarNav - The sidebar navigation links.
 * 
 * @example
 * // Example usage of ProjectPageConfig
 * const config = ProjectPageConfig;
 * console.log(config.mainNav[0].title); // Output: "Documentation"
 * console.log(config.sidebarNav[1].icon); // Output: "post"
 */
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
        {
            title: "settings",
            href: "/project/:projectId/settings",
            icon: "settings",
        },

    ],


 
}

