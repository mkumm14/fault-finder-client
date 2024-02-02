"use client"

import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/hooks"
import { setAuth } from "@/features/auth-slice"

const formSchema = z.object({
        username: z.string().min(1, {
            message: 'This is required'
        }),
        password: z.string().min(1, {
            message: 'This is required'
        })
    })

export default function LoginPage() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const { toast } = useToast()


    const dispatch = useAppDispatch();

    const navigate = useNavigate();



    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { username, password } = values;
    
        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials:"include"
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                
                if (errorData && typeof errorData === "object") {
                    for (let [_field, errorArray] of Object.entries(errorData)) {
                        // Use a type assertion for errorArray
                        const messages = errorArray as string[];
                        toast({
                            variant: "destructive",
                            className: 'mb-5',
                            description: `${messages[0]}`
                        });
                    }
                } else {
                    toast({
                        variant: "destructive",
                        className: 'mb-5',
                        description: "An unknown error occurred."
                    });
                }
                return;  // Exit early after handling error
            }
    
            dispatch(setAuth());
            toast({
                description: "Logged in successfully"
            });
    
            navigate('/dashboard');
    
        } catch (error: any) {
            console.log(error);
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
                <p className={''}>Already have an account?</p>
                <Button asChild>
                    <Link to={'/sign-up'}>Sign up</Link>
                </Button>
            </div>

            <div className="flex items-center justify-center flex-col mt-10 mb-10 md:mb-0">
                <p className={'text-2xl mb-5 font-bold underline'}>Login</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-64">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username/email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username or email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" type={'password'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
