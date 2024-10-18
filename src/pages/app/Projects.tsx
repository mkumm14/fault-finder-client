/**
 * Projects component that displays a list of user projects in a table format.
 * 
 * This component fetches the user's projects using the `useRetrieveUserProjectQuery` hook
 * and displays them in a table. Each row in the table is clickable and navigates to the 
 * project's detail page.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered Projects component.
 * 
 * 
 * @remarks
 * This component uses the `useNavigate` hook from `react-router-dom` to handle navigation
 * and the `useAppSelector` hook to access the authentication state from the Redux store.
 * 
 * @function
 * @name Projects
 * 
 * @hook
 * @name useRetrieveUserProjectQuery
 * @description Fetches the user's projects from the API.
 * 
 * @hook
 * @name useAppSelector
 * @description Accesses the authentication state from the Redux store.
 * 
 * @hook
 * @name useNavigate
 * @description Provides navigation functionality.
 * 
 * @typedef {Object} Project
 * @property {string} id - The unique identifier of the project.
 * @property {string} title - The title of the project.
 * @property {string} owner - The owner of the project.
 * @property {string} created_date - The date the project was created.
 * @property {string} updated_date - The date the project was last updated.
 */
import AddProject from "@/components/projects/add-project";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRetrieveUserProjectQuery } from "@/features/project-api-slice";
import { useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";

export default function Projects()
{
    

    const  navigate = useNavigate();
    const isAuthenticated  = useAppSelector(state=>state.auth.isAuthenticated)
    const {data: projects, isFetching} = useRetrieveUserProjectQuery(undefined,{skip:!isAuthenticated});


    function navigateToProject(id: any) {

        navigate(`/project/${id}`);
    }

    return (

        <div>

            <AddProject/>
            <Table>

                <TableCaption>
                    {isFetching ? <>loading...</> : <>A list of your projects.</>}
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Created by</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Update At</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {projects?.map((project) => (
                        <TableRow onClick={() => navigateToProject(project.id)} key={project.id}
                                  style={{cursor: 'pointer'}}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.owner}</TableCell>
                            <TableCell>{project.created_date}</TableCell>
                            <TableCell className="text-right">{project.updated_date}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>

    )
}


