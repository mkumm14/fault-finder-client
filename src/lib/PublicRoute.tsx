/**
 * PublicRoute component is responsible for handling public routes in the application.
 * It checks the authentication state and conditionally renders either the child components
 * or redirects to the dashboard if the user is authenticated.
 *
 * @component
 * @returns {JSX.Element} - Returns a JSX element that either renders the child components
 *                          or redirects to the dashboard based on the authentication state.
 *
 * @example
 * ```tsx
 * <Route path="/login" element={<PublicRoute />}>
 *   <Route path="/login" element={<Login />} />
 * </Route>
 * ```
 */
import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {

    const isAuthenticated= useAppSelector(state=>state.auth.isAuthenticated)

    return (
        isAuthenticated ? <Navigate to='/dashboard'/> : <Outlet/>
    );
}

export default PublicRoute;

