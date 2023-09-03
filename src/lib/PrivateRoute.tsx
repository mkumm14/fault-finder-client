import LoadingSpinner from "@/components/LoadingSpinner";
import { useRetrieveUserQuery } from "@/features/auth-api-slice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute= ()=>{

    const {data:AppUser, isLoading} =  useRetrieveUserQuery();

    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    return (
        AppUser ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoute;