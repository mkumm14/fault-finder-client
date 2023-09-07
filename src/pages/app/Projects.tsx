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

export default function Projects()
{
    
    const isAuthenticated  = useAppSelector(state=>state.auth.isAuthenticated)
    const {data: projects, isFetching} = useRetrieveUserProjectQuery(undefined,{skip:!isAuthenticated});


    function navigateToProject(id: any) {

        console.log(`projects/${id}`);
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