import { Flex, Heading } from "@chakra-ui/react";
import PersonAvatar from "../PersonAvatar";

export interface PersonCardProps {
    username: string;
    avatarUrl: string;
}

const PersonCard = (props: PersonCardProps) => {
    return (
        <Flex 
            borderWidth='1px' 
            borderRadius='lg'
            padding='5px'
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