import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import React, { ReactNode, useContext } from "react";
import { useState } from "react";

// Add context creation here
type AuthProvider = {
    children: ReactNode;
}

type AuthProviderContext = {
    authorised: boolean;
    authorisedUser: User;
    signInWithGoogle: () => void;
    signUserOut: () => void;
};

const authContext = React.createContext<AuthProviderContext | undefined>(undefined);

export const useAuth = () => {
    const [authorised, setAuthorised] = useState(false);
    const [authorisedUser, setAuthorisedUser] = useState<User | undefined>(undefined);
    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    // Auth (this definitely needs to be pulled out)
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token.
            // You can use it to access the Google Api.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            // The signed in user info
            const user = result.user;
            if (user) {
                user.getIdToken().then((token) => {
                sessionStorage.setItem('accessToken', token);
                });
                setAuthorised(true);
                setAuthorisedUser(user);
            }
            })
            .catch((error) => {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            
            // The email of the users account used
            const email = error.customData.Email;
        })
    };

    const signUserOut = () => {
        signOut(auth).then(() => {
        // Clear session storage
        sessionStorage.clear();
        setAuthorisedUser(undefined);
        setAuthorised(false);
        alert('Logged out successfully');
        }).catch((error) => {
        alert(error);
        });
    };

    return {
        authorised,
        signInWithGoogle,
        signUserOut,
        authorisedUser
    }
};

/*export const AuthProvider = ({ children } : AuthProvider) => {
    const auth = useAuth();
    <authcontext

};

export const AuthConsumer = () => {
    return useContext(authContext);
};*/