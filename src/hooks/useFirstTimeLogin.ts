import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import { userConverter } from "../firebase/firestore";

export const useFirstTimeLogin = (): boolean => {
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);

    const db = getFirestore(app);
    const docRef = doc(db, 'users', 'aaron.r.gregory@gmail.com').withConverter(userConverter);

    useEffect(() => {
        getDoc(docRef).then((result) => {
            if(!result.exists()) {
                setIsFirstLogin(false);
                return;
            }

            let user = result.data();
            console.log(user);

            if(!user.firstTimeLogin) {
                setIsFirstLogin(false);
                return;
            }

            setIsFirstLogin(true);
        })
    });

    return isFirstLogin;
}