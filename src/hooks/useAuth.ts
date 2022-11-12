import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

export type Auth = {
    authorised: boolean;
    accessToken: string | null;
    signInWithGoogle: () => void;
    signUserOut: () => void;
}

export const useAuth = (): Auth => {
    const [authorised, setAuthorised] = useState<boolean>(localStorage.getItem('accessToken') ? true : false);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence);

    // Verify token against Google
    // If token is valid still, we are auth'd
    useEffect(() => {
        let tmpAccessToken = localStorage.getItem('accessToken');
        if (tmpAccessToken) {
            // Verify token
            auth.currentUser?.getIdToken(true).then(token => {
                console.log(`Refreshed token: ${token}`);
                setAccessToken(token);
                setAuthorised(true);
            });
        }
    });

    // Auth (this definitely needs to be pulled out)
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token.
                // You can use it to access the Google Api.
                const credential = GoogleAuthProvider.credentialFromResult(result);

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