import { Flex, Image } from "@chakra-ui/react";

export interface PersonAvatarProps {
    source: string;
};

const PersonAvatar = (props: PersonAvatarProps) => {
    return (
        <Flex
            width='64px' 
            height='64px' 
        >
            <Image src={ props.source } borderRadius='md' />
        </Flex>
    );
};

export default PersonAvatar;