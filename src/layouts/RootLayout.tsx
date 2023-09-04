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