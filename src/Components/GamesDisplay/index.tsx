import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { Game } from "../../Types/app.type";
import GameList from "../GameList";

export interface GamesDisplayProps {
    games: Game[];
    isLoading: boolean;
};

const GamesDisplay = (props: GamesDisplayProps) => {

    let elementToRender = props.isLoading 
        ? <Flex justifyContent='center'><Spinner /></Flex> 
        : <GameList games={ props.games } />

    let subHeading;

    if (props.games?.length == 0) {
        subHeading = <Flex><Text fontSize='sm'>Please add at least 2 players to find games to play.</Text></Flex>
    } 
    else {
        subHeading = <Flex><Text fontSize='sm'>{ props.games.length } games found.</Text></Flex>
    }

    return (
        <Flex
            flexDirection='column'
            padding='10px'
            gap='20px'
            height='100vh'
        >
            <Heading as='h2' size='md'>Shared Games</Heading>
            { subHeading }
            <Flex 
                overflowY='auto'
            >
                { elementToRender }
            </Flex>
        </Flex>
    );
};

export default GamesDisplay;