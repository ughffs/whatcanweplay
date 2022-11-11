import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/authContext";

export interface RequireAuthProps {
    children?: React.ReactNode
}

const RequireAuth = (props: RequireAuthProps) => {
    const auth = useContext(AuthContext);
    console.log(auth);
    return (
        <>
            { auth?.authorised ? props.children : <Navigate to='/login' replace/> }
        </>
    );
};

export default RequireAuth;