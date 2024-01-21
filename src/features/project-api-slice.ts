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
        })
        
    })
})


export const {useRetrieveUserProjectQuery, useAddProjectMutation, useRetrieveProjectDetailsQuery} = projectApiSlice;