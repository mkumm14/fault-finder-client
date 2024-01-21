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
            <p className="text-4xl">{project.title}</p>
            

        </div>
    )

}