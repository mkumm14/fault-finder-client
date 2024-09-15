import { apiSlice } from "./api-slice";

interface Project {
    id: number;          // Project ID
    title: string;       // Project Title
    owner: string;       // Owner's Username
    created_date: string;  // Creation Date (as an ISO string)
    updated_date: string;  // Updated Date (as an ISO string)
    updated_by: string | null;  // Updated By Username or null
}


interface ProjectDetail{
    id: string;
    title: string;
    description: string;
    users: string[];
    created_date: string;
    updated_date: string;
    owner_username: string;
    updated_by_username: string;
}

function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Outputs something like "8/20/2023"
}

const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
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
        addProject: builder.mutation({
            query: ({title, description}) => ({
                url: '/projects/create',
                method: 'POST',
                body: {title, description}

            }),
            invalidatesTags:['Projects']


        }),
        retrieveProjectDetails: builder.query<ProjectDetail, string | undefined>({
            query:(id)=>`/projects/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],

        }),
        updateProject: builder.mutation({
            query: ({id, title, description}) => ({
                url: `/projects/update/${id}`,  // Ensure the endpoint is correct
                method: 'PATCH',  // Use PATCH for partial updates
                body: { title, description }  // Send only the fields being updated
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Project', id },  // Invalidate the specific 'Project' by id
                'Projects',  // Optionally invalidate the entire project list as well
            ]


        })
        
    })
})


export const {useRetrieveUserProjectQuery, useAddProjectMutation, useRetrieveProjectDetailsQuery, useUpdateProjectMutation} = projectApiSlice;