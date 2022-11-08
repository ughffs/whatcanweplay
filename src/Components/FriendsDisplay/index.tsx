import { useState } from "react";
import PersonList from "../PersonList";
import { Person } from "../../Types/app.type";
import { Alert, AlertIcon, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import PersonSelect from "../PersonSelect";
import steamService from '../../services/steamService';
import { useEffect } from 'react';

export interface FriendsDisplayProps { 
    people: Person[];
    onSelectFriend: (steamId: string) => void;
};

const FriendsDisplay = (props: FriendsDisplayProps) => {
    const [friends, setFriends] = useState<Person[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<Person[]>([]);
    const [isSomeoneSelected, setIsSomeoneSelected] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorFetchingFriends, setErrorFetchingFriends] = useState<boolean>(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null | undefined>(null);

    useEffect(() => {
        setFilteredFriends(friends.filter(friend => friend.personaname.toLowerCase().includes(searchTerm)));
    }, [searchTerm, friends])

    const handlePersonSelect = async (steamId: string) => {
        setIsLoading(true);
        setErrorFetchingFriends(false);
        setSelectedPerson(props.people.find(person => person.steamid === steamId));

        let result;

        try {
            result = await steamService.getFriendsOfPersonBySteamId(steamId);
        }
        catch(ex) {
            setIsLoading(false);
            setErrorFetchingFriends(true);
            setFriends([]);
            return;
        }

        if (result != null && result.length > 0) {
            let mappedPeople: Person[] = result.map(person => {
                return {
                    avatar: person.avatarmedium,
                    personaname: person.personaname,
                    profileurl: person.profileurl,
                    steamid: person.steamid,
                    communityVisibilityState: person.communityvisibilitystate
                };
            })
            setFriends(mappedPeople);
            setIsSomeoneSelected(true);
            setIsLoading(false);
        }
    };

    const handleOnFriendClick = (steamId: string) => {
        props.onSelectFriend(steamId);
    }

    const handleOnSearchTermChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Flex 
            flexDirection='column' 
            gap='10px' 
            maxHeight='50vh'
            padding='10px'
        >
            <Heading as='h2' size='md'>Add friends</Heading>

            <Flex>
                <Text fontSize='sm'>Select a person to view their friends list.</Text>
            </Flex>

            <PersonSelect 
                people={ props.people }
                onSelect={ handlePersonSelect }
            />
            
            {
                isSomeoneSelected &&
                <Flex>
                    <Input 
                        placeholder='Filter by display name'
                        onChange={ handleOnSearchTermChanges }
                    />
                </Flex>
            }
                
            {
                errorFetchingFriends && 
                <Alert status='warning' borderRadius='sm'>
                    <AlertIcon />
                    Unable to fetch friends for the selected person ({ selectedPerson?.personaname }). This is likely due to their privacy settings.
                </Alert>
            }

            <Flex overflowY='auto'>
                {
                    isLoading 
                        ? <Flex justifyContent='center'><Spinner /></Flex> 
                        : <PersonList 
                            people={ filteredFriends }
                            onPersonClick={ handleOnFriendClick }/>
                }
            </Flex>
        </Flex>
    );
};

export default FriendsDisplay;