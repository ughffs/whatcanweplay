import { doc, DocumentReference, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import { AuthContext } from "../contexts/auth/authContext";
import { User, userConverter } from "../firebase/firestore";

export type UseFirstTimeLogin = {
    isFirstLogin: boolean;
    setIsFirstLoginToFalse: () => Promise<void>;
}

export const useFirstTimeLogin = (): UseFirstTimeLogin => {
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
    const auth = useContext(AuthContext);

    const db = getFirestore(app);

    useEffect(() => {
        const userEmail = auth?.firebaseAuth.currentUser?.email;

        if(userEmail) {
            const docRef = doc(db, 'users', userEmail).withConverter(userConverter);
            getDoc(docRef).then((result) => {
                if(!result.exists()) {
                    setIsFirstLogin(false);
                    return;
                }

                let user = result.data();

                if(!user.first_time_login) {
                    setIsFirstLogin(false);
                    return;
                }

                setIsFirstLogin(true);
            })
        }
    });

    const setIsFirstLoginToFalse = () => 
        new Promise<void>(async (resolve, reject) => {

            const userEmail = auth?.firebaseAuth.currentUser?.email;

            if(userEmail) {
                const docRef = doc(db, 'users', userEmail).withConverter(userConverter);
                
                try {
                    await updateDoc(docRef, {
                        first_time_login: false
                    });
                } catch (error) {
                    reject(error);
                }
            }
            resolve();
        }
    );

    return {
        isFirstLogin,
        setIsFirstLoginToFalse
    }
}