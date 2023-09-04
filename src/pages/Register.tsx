"use client"

import { Link, useNavigate } from "react-router-dom"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email."
    }),
    first_name: z.string(),
    last_name: z.string(),
    password1: z.string().min(5, {
        message: "Password must be at least 5 characters."
    }),
    password2: z.string().min(1, { message: "This field is required." }),
}).refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Password don't match",
});
export default function SignUpPage() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            password1: "",
            password2:"",
        },
    })




    const {toast} = useToast()

    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { first_name, last_name, username, email, password1, password2 } = values;
    
        try {
            const response = await fetch('http://localhost:8000/auth/registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    first_name, 
                    last_name, 
                    username, 
                    email, 
                    password1, 
                    password2 
                }),
                credentials:"include"
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                // Check for any error messages and display them
                const errors = data as Record<string,string[]>;
                for (let [field, errorArray] of Object.entries(errors)) {
                    toast({
                        variant: "destructive",
                        className:'mb-5',
                        description:`${errorArray[0]}`
                    })
                }
            } else {
                toast({
                    description: "Registered successfully"
                });
                navigate('/login')

            }

    
        } catch (error: any) {
            console.error("An error occurred:", error);
            // We'll retain this error message for unexpected errors.
            toast({
                variant: "destructive",
                className: 'mb-5',
                description: "An unexpected error occurred. Please try again."
            });
        }
    
        form.reset();
    }
    
    
    

    return (

        <>

            <div className={'flex justify-end items-center m-5 space-x-3'}>
                <p className={''}>don&apos;t have an account?</p>
                <Button asChild>
                    <Link to={'/login'}>Login</Link>
                </Button>
            </div>

            <div className="flex items-center justify-center flex-col mt-10 mb-10 md:mb-0">
                <p className={'text-2xl mb-5 font-bold underline'}>Sign Up</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Username should be 3 characters long.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <span className={'flex space-y-8 space-x-0 flex-col md:flex-row md:space-y-0 md:space-x-2'}>
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="first name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="last name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            </span>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password1"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password1" type={'password'} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password2"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password2" type={'password'} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
