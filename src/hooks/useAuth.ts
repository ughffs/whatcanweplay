import { 
    AuthProvider,
    browserSessionPersistence, 
    createUserWithEmailAndPassword, 
    EmailAuthProvider, 
    getAuth, 
    GoogleAuthProvider, 
    setPersistence, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    UserCredential,
    AuthError
} from "firebase/auth";
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
    const auth = getAuth();

    const providers: Providers = {
        google: googleAuthProvider
    }

    setPersistence(auth, browserSessionPersistence);

    // Monitor if auth state changes
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdToken()
                    .then(token => setUserIsAuthorisedState(token))
                    .catch(error => console.log(error));
                return;
            }

            resetUserAuthorisedState();
        });
    });

    const signInWithSocialMedia = (provider: AuthProvider) => 
        new Promise<UserCredential>((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then(result => {
                    const user = result.user;
                    if (user) {
                        user.getIdToken().then((token) => {
                            setUserIsAuthorisedState(token);
                        });
                    }
                    Promise.resolve(result)
                })
                .catch(error => {
                    throw error;
                });
        });

    const signInWithEmail = (email: string, password: string) => 
        new Promise<UserCredential>((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    const user = result.user;
                    if (user) {
                        user.getIdToken().then((token) => {
                            setUserIsAuthorisedState(token);
                        });
                    }
                    Promise.resolve(result);
                })
                .catch(error => { 
                    console.log(error);
                    reject(error);
                });
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
                            setUserIsAuthorisedState(token);
                        })
                    }
                    Promise.resolve(userCredential);
                }).catch((error) => {
                    Promise.reject(error);
                });
        })    
    

    const setUserIsAuthorisedState = (accessToken: string) => {
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