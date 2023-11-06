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