import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import FriendsDisplay from './index';
import axios from 'axios';
import { Game, Person, SteamPerson } from '../../Types/app.type';
import { useState } from 'react';

export default {
    title: 'Custom/FriendsDisplay',
    component: FriendsDisplay,
    argTypes: {}
} as ComponentMeta<typeof FriendsDisplay>;

const Template: ComponentStory<typeof FriendsDisplay> = (args) => {
    const [people, setPeople] = useState<Person[]>([]);
    const [searchError, setSearchError] = useState<string>('');

    const searchForPerson = async (steamId: string) => {
        setSearchError('');

        let alreadyExists: boolean = false;
        people.forEach(p => {
            if(p.steamid === steamId)
                alreadyExists = true;
        });

        if(alreadyExists)
        {
            setSearchError('Steam account already in the list.')
            return;
        }

        const resp = await axios.get<SteamPerson>('http://localhost:1234/steam/user/', {
            params: {
                steamid: steamId
            }
        });

        const player = resp.data;
        const tmpPerson: Person = {
            avatar: player.avatarmedium,
            personaname: player.personaname,
            profileurl: player.profileurl,
            steamid: player.steamid,
            communityVisibilityState: player.communityvisibilitystate
        };
        
        setPeople([...people, tmpPerson]);
    };



    const removePerson = (steamId: string) => {
        let index = people.findIndex(p => 
            p.steamid === steamId);

        if(index != -1)
        {
            let tmpArray = [...people];
            tmpArray.splice(index, 1);
            setPeople(tmpArray);
        }
    };
    return(
        <ChakraProvider theme={theme}>
            <FriendsDisplay 
                onSelectFriend={ searchForPerson }
                people={ people }
            />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
};