import { AuthProvider, browserSessionPersistence, createUserWithEmailAndPassword, EmailAuthProvider, getAuth, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";

export type Auth = {
    authorised: boolean;
    accessToken: string | null;
    signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
    signInWithSocialMedia: (provider: AuthProvider) => Promise<UserCredential>;
    signUserOut: () => Promise<void>;
    createUserAccount: (email: string, password: string) => Promise<UserCredential>;
    providers: Providers;
}

export type Providers = {
    google: AuthProvider;
}


export const useAuth = (): Auth => {
    const [authorised, setAuthorised] = useState<boolean>(localStorage.getItem('accessToken') ? true : false);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const googleAuthProvider = new GoogleAuthProvider();
    const emailAuthProvider = new EmailAuthProvider();
    const auth = getAuth();

    const providers: Providers = {
        google: googleAuthProvider
    }

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

    const signInWithSocialMedia = (provider: AuthProvider) => 
        new Promise<UserCredential>((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then(result => {
                    const user = result.user;
                    if (user) {
                        user.getIdToken().then((token) => {
                            setUserAuthorisedState(token);
                        });
                    }
                    Promise.resolve(result)
                })
                .catch(error => reject(error));
        });

    const signInWithEmail = (email: string, password: string) => 
        new Promise<UserCredential>((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    const user = result.user;
                    if (user) {
                        user.getIdToken().then((token) => {
                            setUserAuthorisedState(token);
                        });
                    }
                    Promise.resolve(result);
                }).catch((error) => {
                    Promise.reject(error);
                })
        });
        

    const signUserOut = () => 
        new Promise<void>((resolve, reject) => {
            signOut(auth)
                .then(() => {
                    resetUserAuthorisedState();
                    Promise.resolve();
                })
                .catch((error) => {
                    alert(error);
                    Promise.reject();
                });
        });

    const createUserAccount = (email: string, password: string) => 
        new Promise<UserCredential>((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        user.getIdToken().then((token) => {
                            setUserAuthorisedState(token);
                        })
                    }
                    Promise.resolve(userCredential);
                }).catch((error) => {
                    Promise.reject(error);
                });
        })    
    

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
        signInWithSocialMedia,
        signInWithEmail,
        signUserOut,
        createUserAccount,
        providers
    }
};