import { apiSlice } from "./api-slice";


/**
 * Interface representing a Project.
 * @property {number} id - Project ID.
 * @property {string} title - Project Title.
 * @property {string} owner - Owner's Username.
 * @property {string} created_date - Creation Date (as an ISO string).
 * @property {string} updated_date - Updated Date (as an ISO string).
 * @property {string | null} updated_by - Updated By Username or null.
 */
interface Project {
    id: number;
    title: string;
    owner: string;
    created_date: string;
    updated_date: string;
    updated_by: string | null;
}

/**
 * Interface representing detailed information about a Project.
 * @property {string} id - Project ID.
 * @property {string} title - Project Title.
 * @property {string} description - Project Description.
 * @property {string[]} users - List of usernames associated with the project.
 * @property {string} created_date - Creation Date (as an ISO string).
 * @property {string} updated_date - Updated Date (as an ISO string).
 * @property {string} owner_username - Owner's Username.
 * @property {string} updated_by_username - Username of the person who last updated the project.
 */
interface ProjectDetail {
    id: string;
    title: string;
    description: string;
    users: string[];
    created_date: string;
    updated_date: string;
    owner_username: string;
    updated_by_username: string;
}

/**
 * Formats an ISO date string into a localized date string.
 * @param {string} isoString - The ISO date string to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString();
}

const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        /**
         * Retrieves the list of projects associated with the user.
         * @returns {Project[]} - An array of Project objects.
         */
        retrieveUserProject: builder.query<Project[], void>({
            query: () => '/projects/user-projects',
            transformResponse: (response: Project[]) => {
                return response.map((project) => ({
                    ...project,
                    created_date: formatDate(project.created_date),
                    updated_date: formatDate(project.updated_date),
                }));
            },
            providesTags: ['Projects']
        }),

        /**
         * Adds a new project.
         * @param {Object} params - The parameters for the new project.
         * @param {string} params.title - The title of the new project.
         * @param {string} params.description - The description of the new project.
         * @returns {Project} - The newly created project.
         */
        addProject: builder.mutation({
            query: ({ title, description }) => ({
                url: '/projects/create',
                method: 'POST',
                body: { title, description }
            }),
            invalidatesTags: ['Projects']
        }),

        /**
         * Retrieves detailed information about a specific project.
         * @param {string | undefined} id - The ID of the project to retrieve.
         * @returns {ProjectDetail} - The detailed information about the project.
         */
        retrieveProjectDetails: builder.query<ProjectDetail, string | undefined>({
            query: (id) => `/projects/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],
        }),

        /**
         * Updates an existing project.
         * @param {Object} params - The parameters for updating the project.
         * @param {string} params.id - The ID of the project to update.
         * @param {string} params.title - The new title of the project.
         * @param {string} params.description - The new description of the project.
         * @returns {Project} - The updated project.
         */
        updateProject: builder.mutation({
            query: ({ id, title, description }) => ({
                url: `/projects/update/${id}`,
                method: 'PATCH',
                body: { title, description }
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Project', id },
                'Projects',
            ]
        })
    })
})

export const {useRetrieveUserProjectQuery, useAddProjectMutation, useRetrieveProjectDetailsQuery, useUpdateProjectMutation} = projectApiSlice;


