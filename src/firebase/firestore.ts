import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class User {
    firebase_user_id: string;
    steam_id: string;
    first_time_login: boolean;

    constructor(firebase_user_id: string, steam_id: string, first_time_login: boolean) {
        this.firebase_user_id = firebase_user_id;
        this.steam_id = steam_id;
        this.first_time_login = first_time_login;
    }
}

export const userConverter = {
    toFirestore: (user: User) => {
        return {
            firebase_user_id: user.firebase_user_id,
            steam_id: user.steam_id,
            first_time_login: user.first_time_login
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new User(data?.firebase_user_id, data?.steam_id, data?.first_time_login);
    }
}