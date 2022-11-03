import axios from "axios";
import { GetSharedGamesRequest, GetSharedGamesResponse, SteamPerson } from "../Types/app.type";

const steamService = {
    baseUrl: process.env.REACT_APP_BASE_URL,

    async getSteamPersonById (steamId: string) : Promise<SteamPerson> {

        console.log(`making a call to ${this.baseUrl}`);
        let result = await axios.get<SteamPerson>(`${ this.baseUrl }steam/user/`, {
                params: {
                    steamid: steamId
                }
            })

        return result.data;
    },

    async getFriendsOfPersonBySteamId (steamId: string) : Promise<SteamPerson[]> {
        let result = await axios.get<SteamPerson[]>(`${ this.baseUrl }steam/friends/`, {
                params: {
                    steamid: steamId
                }
            })
        return result.data;
    },

    async getSharedGames(payload: GetSharedGamesRequest) : Promise<GetSharedGamesResponse> {
        let result = await axios.post<GetSharedGamesResponse>(
            `${ this.baseUrl }steam/games`,
            payload
        );

        return result.data;
    } 

}

export default steamService;