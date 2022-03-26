import { Flex, Text } from "@chakra-ui/react";
import { Game } from "../../Types/app.type";
import GameIcon from "../GameIcon";

export interface GameCardProps {
    game: Game;
};

const GameCard = (props: GameCardProps) => {
    return (
        <Flex 
            borderWidth='1px' 
            borderRadius='lg'
            padding='5px'
            userSelect='none'
            bg='#585858'
            color='shared.textColour'
            alignItems='center'
            gap='10px'
        >
            <GameIcon source={ props.game.icon } />

            <Flex 
                flex='1'
                alignItems='center'    
            >
                <Text fontSize='md'>
                    { props.game.name }
                </Text>
            </Flex>
        </Flex>
    );
};

export default GameCard;