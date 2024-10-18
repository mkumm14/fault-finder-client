/**
 * A component that protects routes from being accessed by unauthenticated users.
 * 
 * This component uses the `useAppSelector` hook to check if the user is authenticated.
 * If the user is authenticated, it renders the child components using the `Outlet` component.
 * If the user is not authenticated, it redirects to the login page using the `Navigate` component.
 * 
 * @returns {JSX.Element} The `Outlet` component if the user is authenticated, otherwise the `Navigate` component.
 */
import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute= ()=>{


    const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated)
    
    return (
        isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoute;


