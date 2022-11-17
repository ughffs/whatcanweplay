import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class User {
    firebaseUserId: string;
    steamId: string;
    firstTimeLogin: boolean;

    constructor(firebase_user_id: string, steam_id: string, first_time_login: boolean) {
        this.firebaseUserId = firebase_user_id;
        this.steamId = steam_id;
        this.firstTimeLogin = first_time_login;
    }
}

export const userConverter = {
    toFirestore: (user: User) => {
        return {
            firebase_user_id: user.firebaseUserId,
            steam_id: user.steamId,
            first_time_login: user.firstTimeLogin
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new User(data?.firebase_user_id, data?.steam_id, data?.first_time_login);
    }
}