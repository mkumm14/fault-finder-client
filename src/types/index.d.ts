/**
 * Represents a navigation item.
 * 
 * @property {string} title - The title of the navigation item.
 * @property {string} href - The URL the navigation item points to.
 * @property {boolean} [disabled] - Indicates if the navigation item is disabled.
 */
export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
};

/**
 * Represents a main navigation item.
 */
export type MainNavItem = NavItem;

/**
 * Represents a sidebar navigation item.
 * 
 * @property {string} title - The title of the sidebar navigation item.
 * @property {boolean} [disabled] - Indicates if the sidebar navigation item is disabled.
 * @property {boolean} [external] - Indicates if the sidebar navigation item points to an external link.
 * @property {keyof typeof Icons} [icon] - The icon associated with the sidebar navigation item.
 * @property {string} [href] - The URL the sidebar navigation item points to.
 * @property {NavLink[]} [items] - The sub-items of the sidebar navigation item.
 */
export type SidebarNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
} & (
    | {
        href: string;
        items?: never;
    }
    | {
        href?: string;
        items: NavLink[];
    }
);

/**
 * Represents the site configuration.
 * 
 * @property {string} name - The name of the site.
 * @property {string} description - The description of the site.
 * @property {string} url - The URL of the site.
 * @property {string} ogImage - The Open Graph image URL of the site.
 * @property {Object} links - The social media links of the site.
 * @property {string} links.twitter - The Twitter link of the site.
 * @property {string} links.github - The GitHub link of the site.
 */
export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        twitter: string;
        github: string;
    };
};

/**
 * Represents the documentation configuration.
 * 
 * @property {MainNavItem[]} mainNav - The main navigation items for the documentation.
 * @property {SidebarNavItem[]} sidebarNav - The sidebar navigation items for the documentation.
 */
export type DocsConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};

/**
 * Represents the marketing configuration.
 * 
 * @property {MainNavItem[]} mainNav - The main navigation items for marketing.
 */
export type MarketingConfig = {
    mainNav: MainNavItem[];
};

/**
 * Represents the dashboard configuration.
 * 
 * @property {SidebarNavItem[]} sidebarNav - The sidebar navigation items for the dashboard.
 */
export type DashboardConfig = {
    sidebarNav: SidebarNavItem[];
};

/**
 * Represents the project configuration.
 * 
 * @property {MainNavItem[]} mainNav - The main navigation items for the project.
 * @property {SidebarNavItem[]} sidebarNav - The sidebar navigation items for the project.
 */
export type ProjectConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};



