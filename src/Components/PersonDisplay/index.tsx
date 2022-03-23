import axios from "axios";
import { useState } from "react";
import PersonList from "../PersonList";
import SearchForm from "../SearchForm";
import { Person, SteamPerson } from "../../Types/app.type";

const PersonDisplay = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchForPeople = async (steamId: string) => {
        setIsLoading(true);

        const resp = await axios.get<SteamPerson>('http://localhost:1234/steam/user/', {
            params: {
                steamid: steamId
            }
        });

        const player = resp.data.response.players[0];
        const tmpPerson: Person = {
            avatar: player.avatarmedium,
            personaname: player.personaname,
            profileurl: player.profileurl,
            steamid: player.steamid
        };
        
        setPeople([...people, tmpPerson]);
        setIsLoading(false);
    };

    return (
        <>
            <SearchForm 
                onSubmit={ searchForPeople } 
                isLoading={ isLoading } />
        </>  
    );
};

export default PersonDisplay;