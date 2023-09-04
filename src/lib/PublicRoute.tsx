import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {

    const isAuthenticated= useAppSelector(state=>state.auth.isAuthenticated)

    return (
        isAuthenticated ? <Navigate to='/dashboard'/> : <Outlet/>
    );
}

export default PublicRoute;
