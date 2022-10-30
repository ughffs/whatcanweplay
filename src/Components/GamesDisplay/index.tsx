import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { Game } from "../../Types/app.type";
import GameList from "../GameList";

export interface GamesDisplayProps {
    games: Game[];
    isLoading: boolean;
    enoughPlayersToDisplayGames: boolean;
};

const GamesDisplay = (props: GamesDisplayProps) => {

    let elementToRender = props.isLoading 
        ? <Flex justifyContent='center'><Spinner /></Flex> 
        : <GameList games={ props.games } />

    let subHeading;

    if (props.enoughPlayersToDisplayGames && props.games?.length > 0 && !props.isLoading) {
        subHeading = <Flex><Text fontSize='sm'>{ props.games.length } games found.</Text></Flex>
    }
    else if(!props.enoughPlayersToDisplayGames && !props.isLoading) {
        subHeading = <Flex><Text fontSize='sm'>Please add at least 2 players to find games to play.</Text></Flex>
    }
    else if (props.games?.length == 0 && !props.isLoading) {
        subHeading = <Flex><Text fontSize='sm'>There are no games found that you all own.</Text></Flex>
    } 

    return (
        <Flex
            flexDirection='column'
            padding='10px'
            gap='20px'
            height='100vh'
            minWidth='400px'
            maxWidth='400px'
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