import { browserSessionPersistence, createUserWithEmailAndPassword, EmailAuthProvider, getAuth, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

export type Auth = {
    authorised: boolean;
    accessToken: string | null;
    signInWithGoogle: () => void;
    signInWithEmail: (email: string, password: string) => void;
    signUserOut: () => void;
    createUserAccount: (email: string, password: string) => void;
}

export const useAuth = (): Auth => {
    const [authorised, setAuthorised] = useState<boolean>(localStorage.getItem('accessToken') ? true : false);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const googleAuthProvider = new GoogleAuthProvider();
    const emailAuthProvider = new EmailAuthProvider();
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence);

    // Verify token against Google
    // If token is valid still, we are auth'd
    useEffect(() => {
        let tmpAccessToken = localStorage.getItem('accessToken');
        if (tmpAccessToken) {
            // Verify token
            auth.currentUser?.getIdToken(true).then(token => {
                setUserAuthorisedState(token);
            });
        }
    });

    // Auth (this definitely needs to be pulled out)
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token.
                // You can use it to access the Google Api.
                const credential = GoogleAuthProvider.credentialFromResult(result);

                // The signed in user info
                const user = result.user;
                if (user) {
                    user.getIdToken().then((token) => {
                        setUserAuthorisedState(token);
                    });
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

    const signInWithEmail = (email: string, password: string) => {
        console.log(`${email} - ${password}`);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                if (user) {
                    user.getIdToken().then((token) => {
                        setUserAuthorisedState(token);
                    });
                }
            }).catch((error) => {
                console.log(error);
                // Handle errors here
                const errorCode = error.code;
                const errorMessage = error.message;
                
                // The email of the users account used
                const email = error.customData.Email;
            })
        }

    const signUserOut = () => {
        signOut(auth).then(() => {
            resetUserAuthorisedState();
            return true;
        }).catch((error) => {
            alert(error);
        });

        return false;
    };

    const createUserAccount = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    user.getIdToken().then((token) => {
                        setUserAuthorisedState(token);
                    })
                }
            }).catch((error) => {
                return error;
            });
    }

    const setUserAuthorisedState = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);
        setAuthorised(true);
    }

    const resetUserAuthorisedState = () => {
        localStorage.clear();
        setAuthorised(false);
        setAccessToken('');
    }

    return {
        authorised,
        accessToken,
        signInWithGoogle,
        signInWithEmail,
        signUserOut,
        createUserAccount
    }
};