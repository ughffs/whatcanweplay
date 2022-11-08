import PersonList from "../PersonList";
import SearchForm from "../SearchForm";
import { Person } from "../../Types/app.type";
import { Alert, AlertIcon, Flex, Heading } from "@chakra-ui/react";

export interface PersonDisplayProps { 
    searchForPerson: (steamId: string) => void;
    removePerson: (steamId: string) => void;
    people: Person[];
    isSearching: boolean;
    error: string;
};

const PersonDisplay = (props: PersonDisplayProps) => {

    const handleSearchForPerson = (steamId: string) => {
        props.searchForPerson(steamId);
    };

    const handleRemovePerson = (steamId: string) => {
        props.removePerson(steamId);
    };

    return (
        <Flex 
            gap='20px'
            flexDirection='column'
            padding='10px'
            maxHeight='50vh'
        >
            <Heading as='h2' size='md'>Players</Heading>
            <SearchForm 
                onSubmit={ handleSearchForPerson } 
                isLoading={ props.isSearching } />

            {
                props.error !== '' && 
                <Alert status='warning' color='gray.800' borderRadius='sm'>
                    <AlertIcon />
                    { props.error }
                </Alert>
            }
            <Flex overflowY='auto'>
                <PersonList 
                    people={ props.people }
                    onPersonClick={ handleRemovePerson }
                />
            </Flex>
        </Flex>  
    );
};

export default PersonDisplay;