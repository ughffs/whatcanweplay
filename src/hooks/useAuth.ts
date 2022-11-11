import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import React, { ReactNode, useContext } from "react";
import { useState } from "react";

export type Auth = {
    authorised: boolean;
    authorisedUser: User | undefined;
    signInWithGoogle: () => void;
    signUserOut: () => void;
}

export const useAuth = (): Auth => {
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
        authorisedUser,
        signInWithGoogle,
        signUserOut,
    }
};