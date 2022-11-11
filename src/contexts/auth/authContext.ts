import { User } from "firebase/auth";
import React from "react";
import { Auth } from "../../hooks/useAuth";

type AuthProviderContext = {
    authorised: boolean;
    authorisedUser: User;
    signInWithGoogle: () => void;
    signUserOut: () => void;
};

export const AuthContext = React.createContext<Auth | undefined>(undefined);
