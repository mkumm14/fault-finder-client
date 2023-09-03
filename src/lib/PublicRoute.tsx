import LoadingSpinner from "@/components/LoadingSpinner";
import { useRetrieveUserQuery } from "@/features/auth-api-slice";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { data: AppUser, isLoading } = useRetrieveUserQuery();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        AppUser ? <Navigate to='/dashboard'/> : <Outlet/>
    );
}

export default PublicRoute;
