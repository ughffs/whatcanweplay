import { Flex } from "@chakra-ui/react";
import { Game } from "../../Types/app.type";
import GameCard from "../GameCard";

export interface GameListProps {
    games: Game[];
};

const GameList = (props: GameListProps) => {
    return (
        <Flex 
            flex='1'
            flexDirection='column'
            gap='5px'
            marginRight='5px'>
            {
                props.games.map(g =>
                    <GameCard 
                        key={ g.appid }
                        game={ g }
                    />
                )
            }
        </Flex>
    );
};

export default GameList;