import { Link, useNavigate } from "react-router-dom"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { logout as setLogout } from '@/features/auth-slice';


import {useToast} from "@/components/ui/use-toast";
import { useLogoutMutation, useRetrieveUserQuery } from "@/features/auth-api-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";


interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: any
}

export function UserAccountNav({ user }: UserAccountNavProps) {

    const isAuthenticated  = useAppSelector(state=>state.auth.isAuthenticated)

    const {data:AppUser, isLoading} =  useRetrieveUserQuery(undefined,{skip:!isAuthenticated});

    const dispatch = useAppDispatch();


    const [logout] = useLogoutMutation();

    const {toast} = useToast()


    const navigate = useNavigate()

    const handleLogout = async () => {

        try {
            await logout(undefined).unwrap();
            dispatch(setLogout());
            toast({
                description: "Logged out successfully"
            })

            location.reload()

        }catch (error:any)
        {
            console.log(error)
        }



    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{ name: AppUser?.username || null, image: user.image || null }}
                    className="h-8 w-8"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {AppUser?.username && <p className="font-medium">{AppUser?.username}</p>}
                        {AppUser?.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {AppUser?.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link to="/dashboard/billing">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}