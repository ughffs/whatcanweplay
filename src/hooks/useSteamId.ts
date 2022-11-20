import { doc, DocumentReference, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import { AuthContext } from "../contexts/auth/authContext";
import { userConverter } from "../firebase/firestore";

export type UseSteamId = {
    steamId: string;
    setSteamIdForLoggedInUser: (steamId: string) => Promise<void>;
}

export const useSteamId = (): UseSteamId => {
    const [steamId, setSteamId] = useState<string>('');
    const auth = useContext(AuthContext);

    const db = getFirestore(app);

    useEffect(() => {
        const userEmail = auth?.firebaseAuth.currentUser?.email;

        if(userEmail) {
            const docRef = doc(db, 'users', userEmail).withConverter(userConverter);
            getDoc(docRef).then(result => {
                let user = result.data();

                if(user?.steam_id) {
                    setSteamId(user.steam_id)
                    return;
                }
            })
        }
    });

    const setSteamIdForLoggedInUser = (steamId: string) => 
        new Promise<void>(async (resolve, reject) => {

            const userEmail = auth?.firebaseAuth.currentUser?.email;
            const cleanedSteamId = steamId.replace(/[^0-9]/g, '');

            if(userEmail) {
                const docRef = doc(db, 'users', userEmail).withConverter(userConverter);

                try {
                    await updateDoc(docRef, {
                        steam_id: cleanedSteamId
                    });
                } catch (error) {
                    reject(error);
                }
            }

            resolve();
        }
    );

    return {
        steamId,
        setSteamIdForLoggedInUser
    }
}