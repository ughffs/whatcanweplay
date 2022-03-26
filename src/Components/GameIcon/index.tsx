import { Flex, Image } from "@chakra-ui/react";

export interface GameIconProps {
    source: string;
};

const GameIcon = (props: GameIconProps) => {
    return (
        <Flex
            width='32px' 
            height='32px' 
        >
            <Image src={ props.source } borderRadius='md' />
        </Flex>
    );
};

export default GameIcon;