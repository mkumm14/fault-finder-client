import { useRetrieveProjectDetailsQuery } from "@/features/project-api-slice";
import { useParams } from "react-router-dom"




export default function ProjectSettings() {

    const { projectId } = useParams()


    const { data: project, isFetching } = useRetrieveProjectDetailsQuery(projectId);


    if (isFetching) {
        return <p>Loading...</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <div>
            <p>Project Settings</p>
            <div className=" pt-5">

                <p>{project.title}</p>
                <p>{project.description}</p>
                <p>{project.users}</p>
                <p>{new Date(project.created_date).toDateString()}</p>
                <p>{new Date(project.updated_date).toDateString()}</p>
                <p>{project.owner_username}</p>
                <p>{project.updated_by_username}</p>



            </div>
        </div>
    )

}