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
import { useLoginMutation } from "@/features/auth-api-slice"
import { useAppDispatch } from "@/hooks/hooks"
import { setAuth } from "@/features/auth-slice"

const formSchema = z.object({
    username: z.string().nonempty({
        message: 'This is required'
    }),
    password: z.string().nonempty({
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

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { username, password } = values;
        try {
            const response = await login({ username, password }).unwrap();
            console.log(response.data); // Log the response data
            dispatch(setAuth())
            toast({
                description: "Logged in successfully"
            });

            navigate('/dashboard');
        } catch (error: any) {
            
            if (error.data) {
                const errors = error.data as Record<string, string[]>;
                for (let [field, errorArray] of Object.entries(errors)) {
                    toast({
                        variant: "destructive",
                        className: 'mb-5',
                        description: `${errorArray[0]}`
                    })
                }

            }

        }

        form.reset();  // You may choose to reset or not based on your requirements
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
