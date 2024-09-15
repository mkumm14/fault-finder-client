import { useRetrieveProjectDetailsQuery,useUpdateProjectMutation } from "@/features/project-api-slice"; // Assuming you have an API hook for updating
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAppSelector } from "@/hooks/hooks";
import { useRetrieveUserQuery } from "@/features/auth-api-slice";

const formSchema = z.object({
    title: z
        .string()
        .min(1)
        .refine((value) => value.length > 0, {
            message: "Title cannot be empty.",
        }),
    description: z
        .string()
        .min(1)
        .refine((value) => value.length > 0, {
            message: "Description cannot be empty.",
        }),
    created_date: z
        .string()
        .min(1)
        .refine((value) => value.length > 0, {
            message: "Created date cannot be empty.",
        }),
    updated_date: z
        .string()
        .min(1)
        .refine((value) => value.length > 0, {
            message: "Updated date cannot be empty.",
        }),
});

export default function ProjectSettings() {
    const { projectId } = useParams();

    const { data: project, isFetching } = useRetrieveProjectDetailsQuery(projectId);

    const [updateProject] = useUpdateProjectMutation();
    
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    const { data: AppUser } = useRetrieveUserQuery(undefined, { skip: !isAuthenticated });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: project?.title,
            description: project?.description,
            created_date: new Date(project?.created_date ?? "").toDateString(),
            updated_date: new Date(project?.updated_date ?? "").toDateString(),
        },
    });

    const { reset } = form;
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (project) {
            reset({
                title: project.title ?? "",
                description: project.description ?? "",
                created_date: new Date(project?.created_date ?? "").toDateString(),
                updated_date: new Date(project?.updated_date ?? "").toDateString(),
            });
        }
    }, [project, reset]);

    if (isFetching) {
        return <p>Loading...</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateProject({
                id: projectId,
                title: values.title,
                description: values.description,
            }).unwrap();
    
            console.log('Project updated successfully');
            setEditMode(false); // Exit edit mode after successful submission
        } catch (error) {
            console.error('Failed to update the project', error);
        }
    
    }

    async function resetForm() {
        setEditMode(false);
        reset({
            title: project?.title ?? "",
            description: project?.description ?? "",
            created_date: new Date(project?.created_date ?? "").toDateString(),
            updated_date: new Date(project?.updated_date ?? "").toDateString(),
        });
    }

    return (
        <div className="space-y-8">
            <div>
                <Form {...form}>
                    <form className="space-y-8 container" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={!editMode}
                                            className={`${!editMode ? "disabled disabled:font-semibold" : ""}`}
                                        />
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
                                        <Input
                                            {...field}
                                            disabled={!editMode}
                                            className={`${!editMode ? "disabled disabled:font-semibold" : ""}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <span className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-2">
                            <FormField
                                control={form.control}
                                name="created_date"
                                render={({ field }) => (
                                    <FormItem className="w-full md:w-1/2">
                                        <FormLabel>Created Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                className={"disabled disabled:font-semibold"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="updated_date"
                                render={({ field }) => (
                                    <FormItem className="w-full md:w-1/2">
                                        <FormLabel>Updated Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                className={"disabled disabled:font-semibold"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </span>


                        {editMode && (
                            <div className="space-x-5">
                                <Button type="submit">
                                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                                <Button type="button" variant="destructive" onClick={resetForm}>
                                    Cancel
                                </Button>
                            </div>
                        )}

                        {/* {editMode && (
                            <Button type="button" variant="destructive">
                                Cancel
                            </Button>
                        )} */}
                    </form>
                </Form>
            </div>
            <div className="container">
                {!editMode && (
                    <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setEditMode(true);
                        }}
                    >
                        <Icons.pencil />
                    </Button>
                )}
            </div>
        </div>
    );
}
