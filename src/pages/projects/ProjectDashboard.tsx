/**
 * ProjectDashboard component fetches and displays the details of a specific project.
 * 
 * This component uses the `useParams` hook from `react-router-dom` to extract the `projectId`
 * from the URL parameters. It then uses the `useRetrieveProjectDetailsQuery` hook to fetch
 * the project details from the API.
 * 
 * @returns A React component that displays the project title if the data is fetched successfully,
 *          or a loading message while the data is being fetched.
 */
import { useParams } from "react-router-dom"
import { useRetrieveProjectDetailsQuery } from "@/features/project-api-slice";

export default function ProjectDashboard()
{
    const {projectId} = useParams()


    const {data:project, isFetching } = useRetrieveProjectDetailsQuery(projectId);

    return (
        <>

        {isFetching ? <h1>Fetching...</h1>: <h1>{project?.title}</h1>}
        </>
    )
}

