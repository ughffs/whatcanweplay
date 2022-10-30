import axios from "axios";
import { SteamPerson } from "../Types/app.type";

const steamService = {
    async getSteamPersonById (steamId: string) : Promise<SteamPerson> {
        let result = await axios.get<SteamPerson>('http://localhost:1234/steam/user/', {
                params: {
                    steamid: steamId
                }
            })

        return result.data;
    },

    async getFriendsOfPersonBySteamId (steamId: string) : Promise<SteamPerson[]> {
        console.log('getting friends of person!')
        let result = await axios.get<SteamPerson[]>('http://localhost:1234/steam/friends/', {
                params: {
                    steamid: steamId
                }
            })
        console.log(result.data);
        return result.data;
    }

}

export default steamService;