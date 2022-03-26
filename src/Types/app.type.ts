export interface Person {
    steamid: string;
    personaname: string;
    profileurl: string;
    avatar: string;
};

export interface GetSharedGamesRequest {
    steamIds: string[];
};

export interface GetSharedGamesResponse {
    sharedGames: Game[];
};

export interface Game {
    appid: number;
    name: string;
    icon: string;
}

export interface SteamPerson {
    "response": {
        "players":
        [
            {
                "steamid": string,
                "communityvisibilitystate": number,
                "profilestate": number,
                "personaname": string,
                "profileurl": string,
                "avatar": string,
                "avatarmedium": string,
                "avatarfull": string,
                "avatarhash": string,
                "lastlogoff": number,
                "personastate": number,
                "realname": string,
                "primaryclanid": string,
                "timecreated": number,
                "personastateflags": number,
                "loccountrycode": string
            }
        ]
    }
}