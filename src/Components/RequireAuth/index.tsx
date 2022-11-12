import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/authContext";

export interface RequireAuthProps {
    children?: React.ReactNode
}

const RequireAuth = (props: RequireAuthProps) => {
    const auth = useContext(AuthContext);
    const desiredLocation = useLocation();

    return (
        <>
            { auth?.authorised ? props.children : <Navigate to='/login' replace state={{ path: desiredLocation.pathname}}/> }
        </>
    );
};

export default RequireAuth;