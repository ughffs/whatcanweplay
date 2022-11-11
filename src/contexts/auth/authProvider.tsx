import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from './authContext';
import react from 'react';

type AuthProvider = {
    children: ReactNode;
}

export const AuthProvider = ({ children } : AuthProvider) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
};