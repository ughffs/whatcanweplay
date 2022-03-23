import { Box, Image } from "@chakra-ui/react";

export interface ItemIconProps {
    image: string;
};

const ItemIcon = (props: ItemIconProps) => {
    return (
        <Box
            height='70px'
            width='70px'
        >
            <Image src={ props.image } />
        </Box>
    );
};

export default ItemIcon;