import { Flex, Heading } from "@chakra-ui/react";
import PersonAvatar from "../PersonAvatar";

export interface PersonCardProps {
    steamId: string;
    username: string;
    avatarUrl: string;
    onClick: (steamId: string) => void;
}

const PersonCard = (props: PersonCardProps) => {
    const handleOnClick = () => {
        props.onClick(props.steamId);
    };

    return (
        <Flex 
            borderWidth='1px' 
            borderRadius='lg'
            padding='5px'
            onClick={ handleOnClick }
            userSelect='none'
            bg='#242424'
            color='shared.textColour'
            _hover={{ bg: '#3e3e3e', cursor: 'pointer' }}
        >
            <PersonAvatar source={ props.avatarUrl } />

            <Flex 
                flex='1'
                padding='10px'
                alignItems='center'    
            >
                <Heading as='h4' size='md'>
                    { props.username }
                </Heading>
            </Flex>
        </Flex>
    );
};

export default PersonCard;