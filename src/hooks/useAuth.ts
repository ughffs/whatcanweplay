import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut, User } from "firebase/auth";
import React, { ReactNode, useContext, useEffect } from "react";
import { useState } from "react";

export type Auth = {
    authorised: boolean;
    accessToken: string;
    signInWithGoogle: () => void;
    signUserOut: () => void;
}

export const useAuth = (): Auth => {
    const [authorised, setAuthorised] = useState(false);
    const [accessToken, setAccessToken] = useState<string>('');
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence);

    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            // navigate to the signup page
            return;
        }

        // Verify token against Google
        // If token is valid still, we are auth'd
        setAuthorised(true);
    });

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
                        localStorage.setItem('accessToken', token);
                        setAccessToken(token);
                });
                setAuthorised(true);
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
        localStorage.clear();
        setAuthorised(false);
        setAccessToken('');
        alert('Logged out successfully');
        }).catch((error) => {
        alert(error);
        });
    };

    return {
        authorised,
        signInWithGoogle,
        signUserOut,
        accessToken
    }
};