import { useRetrieveProjectDetailsQuery } from "@/features/project-api-slice";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const formSchema = z.object({
    title: z.string().min(1).refine(value => value.length > 0, {
        message: "Title cannot be empty."
    }),
    description: z.string().min(1).refine(value => value.length > 0, {
        message: "Description cannot be empty."
    }),
    created_date: z.string().min(1).refine(value => value.length > 0, {
        message: "Created date cannot be empty."
    }),
    updated_date: z.string().min(1).refine(value => value.length > 0, {
        message: "updated date cannot be empty."
    }),
})


export default function ProjectSettings() {



    const { projectId } = useParams()


    const { data: project, isFetching } = useRetrieveProjectDetailsQuery(projectId);



    if (isFetching) {
        return <p>Loading...</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: project.title,
            description: project.description,
            created_date: new Date(project.created_date).toDateString(),
            updated_date: new Date(project.updated_date).toDateString(),


        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
    }


    return (
        // <div>
        //     <p>Project Settings</p>
        //     <div className=" pt-5">

        //         <p>{project.title}</p>
        //         <p>{project.description}</p>
        //         <p>{project.users}</p>
        //         <p>{new Date(project.created_date).toDateString()}</p>
        //         <p>{new Date(project.updated_date).toDateString()}</p>
        //         <p>{project.owner_username}</p>
        //         <p>{project.updated_by_username}</p>



        //     </div>
        // </div>



        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 container">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <span className={'flex space-y-8 space-x-0 flex-col md:flex-row md:space-y-0 md:space-x-2'}>            
                    <FormField
                    control={form.control}
                    name="created_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Created Date</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    <FormField
                        control={form.control}
                        name="updated_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Updated Date</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </span>



                <Button type="submit">
                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    )

}