import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { app } from "../config/firebaseConfig";
import { userConverter } from "../firebase/firestore";

export type UseFirstTimeLogin = {
    createUserRecord: (userId: string, emailAddress: string) => Promise<void>;
}

export const useUserRecord = (): UseFirstTimeLogin => {
    const db = getFirestore(app);

    const createUserRecord = (userId: string, emailAddress: string) => 
        new Promise<void>(async (resolve, reject) => {
            if(emailAddress && userId) {
                const docRef = doc(db, 'users', emailAddress).withConverter(userConverter);

                try {
                    setDoc(docRef, {
                        firebase_user_id: userId,
                        first_time_login: true,
                        steam_id: ''
                    })
                } catch (error) {
                    reject(error);
                }
            }
            resolve();
        }
    );

    return {
        createUserRecord
    }
}