import { Link } from "react-router-dom"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"


import {useToast} from "@/components/ui/use-toast";


interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: any
}

export function UserAccountNav({ user }: UserAccountNavProps) {

    // const {data:AppUser} =  useRetrieveUserQuery();

    // const dispatch = useAppDispatch();


    // const [logout] = useLogoutMutation();

    // const router= useRouter()
    const {toast} = useToast()


    const handleLogout = async () => {

        try {
            // await logout(undefined).unwrap();
            // dispatch(setLogout());
            // toast({
            //     description: "Logged out successfully"
            // })
            // router.refresh()

        }catch (error:any)
        {
            console.log(error)
        }



    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{ name: user?.username || null, image: user.image || null }}
                    className="h-8 w-8"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.username && <p className="font-medium">{user?.username}</p>}
                        {user?.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user?.email}
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