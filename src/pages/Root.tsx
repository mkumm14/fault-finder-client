/**
 * Root component that redirects to the login page.
 *
 * This component uses the `Navigate` component from `react-router-dom`
 * to redirect users to the `/login` route when they access the root path.
 *
 * @component
 * @returns {JSX.Element} A JSX element that performs the redirection.
 */
import { Navigate } from "react-router-dom";

export default function Root()
{


    return (
        <Navigate to='/login'/>
    )
}


