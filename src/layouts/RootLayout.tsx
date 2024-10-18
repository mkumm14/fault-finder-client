/**
 * RootLayout component that handles user authentication state and displays a loading spinner while fetching user data.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the `useRetrieveUserQuery` hook to fetch user data and dispatches actions to update the authentication state.
 * If user data is successfully retrieved, the `setAuth` action is dispatched.
 * If there is an error retrieving user data, the `logout` action is dispatched.
 * The `finishInitialLoad` action is dispatched after attempting to retrieve user data.
 * While the user data is being fetched, a `LoadingSpinner` component is displayed.
 */
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRetrieveUserQuery } from "@/features/auth-api-slice";
import { finishInitialLoad, logout, setAuth } from "@/features/auth-slice";
import { useAppDispatch } from "@/hooks/hooks"
import { useEffect } from "react";

export default function RootLayout({children}:{children:React.ReactNode})
{
    const dispatch = useAppDispatch();
    const {data, error, isLoading} = useRetrieveUserQuery();
    
    useEffect(()=>{
        if(data)
        {
            dispatch(setAuth());
        }
        else if(error)
        {
            dispatch(logout())
        }
        dispatch(finishInitialLoad())
    }, [data,error,dispatch])


    if(isLoading)
    {
        return <LoadingSpinner/>
    }
    
    return (
        <>
            {children}
        </>
    )
}

