import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/authContext";

export interface RedirectIfAuthorisedProps {
    children?: React.ReactNode,
    redirectUrl: string;
}

const RedirectIfAuthorised = (props: RedirectIfAuthorisedProps) => {
    const auth = useContext(AuthContext);

    return (
        <>
            { auth?.authorised 
                ? <Navigate to={props.redirectUrl}/> 
                : props.children 
            }
        </>
    );
};

export default RedirectIfAuthorised;