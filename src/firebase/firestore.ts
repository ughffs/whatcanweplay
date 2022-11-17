import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class User {
    firebaseUserId: string;
    steamId: string;

    constructor(firebase_user_id: string, steam_id: string) {
        this.firebaseUserId = firebase_user_id;
        this.steamId = steam_id;
    }
}

export const userConverter = {
    toFirestore: (user: User) => {
        return {
            firebase_user_id: user.firebaseUserId,
            steam_id: user.steamId
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new User(data?.firebase_user_id, data?.steam_id);
    }
}