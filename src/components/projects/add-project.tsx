import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";


import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAddProjectMutation } from "@/features/project-api-slice";


const formSchema = z.object({
    title: z.string().nonempty({
        message: 'This is required'
    }),
    description: z.string().nonempty({
        message: 'This is required'
    })
})


export default function AddProject() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })


    const [addProject, { isLoading, isError, error }] = useAddProjectMutation();


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, description } = values;



        try {
            await addProject({ title, description });
            console.log("project added successfully")
        }
        catch (e) {
            console.error("error adding projecct", e)
        }


        form.reset()



    }



    return (
        <div className="flex justify-end mb-4">
            <Sheet>
                <SheetTrigger asChild>

                    <Button variant="ghost" size="sm" className="h-8 w-8 px-0"
                        onClick={() => console.log("add project")}>
                        <Icons.add />
                    </Button>
                </SheetTrigger>
                <Form {...form}>
                    <SheetContent className="lg:w-1/2 md:w-3/4 w-full overflow-auto">
                        <SheetHeader>
                            <SheetTitle>Add Project</SheetTitle>
                            <SheetDescription>
                                Create a project here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>

                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Project title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Project description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* <div className="grid gap-4 py-4">
                                <div className="grid gap-4">
                                    <Label htmlFor="title">
                                        Title
                                    </Label>
                                    <Input id="title" className="col-span-3" />
                                </div>
                                <div className="grid  gap-4">
                                    <Label htmlFor="description" >
                                        Description
                                    </Label>
                                    <Textarea id='description' />
                                </div>


                            </div> */}
                            <SheetFooter>
                                {/* <SheetClose asChild> */}
                                    {isLoading ? <div>
                                        loading....
                                    </div> :
                                        <Button type="submit" >Save changes</Button>
                                    }

                                {/* </SheetClose> */}
                            </SheetFooter>
                        </form>
                    </SheetContent>

                </Form>
            </Sheet>
        </div>
    )

}
