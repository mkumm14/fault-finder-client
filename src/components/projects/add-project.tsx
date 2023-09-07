import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";

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

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import { Textarea } from "@/components/ui/textarea"

import {Label} from "@/components/ui/label"

import {Input} from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

export default function AddProject() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

    return (
        <div className="flex justify-end mb-4">
            <Sheet> 
                <SheetTrigger asChild>

                    <Button variant="ghost" size="sm" className="h-8 w-8 px-0"
                            onClick={() => console.log("add project")}>
                        <Icons.add/>
                    </Button>
                </SheetTrigger>
                <SheetContent className="lg:w-1/2 md:w-3/4 w-full overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add Project</SheetTitle>
                        <SheetDescription>
                            Create a project here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
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
        
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )

}
