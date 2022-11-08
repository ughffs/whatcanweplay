import { LockIcon } from "@chakra-ui/icons";
import { Flex, Heading, Tooltip } from "@chakra-ui/react";
import PersonAvatar from "../PersonAvatar";

export interface PersonCardProps {
    steamId: string;
    username: string;
    avatarUrl: string;
    privateProfile: boolean;
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
                justifyContent='space-between'   
                gap='10px'
            >
                <Heading as='h4' size='md'>
                    { props.username }
                </Heading>

                {
                    props.privateProfile &&
                    <Tooltip label='This account is private and might prevent games from being fetched.'>
                        <LockIcon />
                    </Tooltip>
                }
            </Flex>
        </Flex>
    );
};

export default PersonCard;