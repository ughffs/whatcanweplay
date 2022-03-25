import axios from "axios";
import { useState } from "react";
import PersonList from "../PersonList";
import SearchForm from "../SearchForm";
import { Person, SteamPerson } from "../../Types/app.type";
import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Flex } from "@chakra-ui/react";

const PersonDisplay = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const searchForPeople = async (steamId: string) => {
        setIsLoading(true);
        setError('');

        let alreadyExists: boolean = false;
        people.forEach(p => {
            if(p.steamid === steamId)
                alreadyExists = true;
        });

        if(alreadyExists)
        {
            setError('Steam account already in the list.')
            setIsLoading(false);
            return;
        }

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
        <Flex 
            gap='20px'
            flexDirection='column'
            padding='10px'
        >
            <SearchForm 
                onSubmit={ searchForPeople } 
                isLoading={ isLoading } />

            {
                error !== '' && 
                <Alert status='warning' color='gray.800' borderRadius='sm'>
                    <AlertIcon />
                    { error }
                </Alert>
            }

            <PersonList 
                people={ people }
            />
        </Flex>  
    );
};

export default PersonDisplay;