import { Flex } from "@chakra-ui/react";
import React from "react";
import { getThemeBorderColour } from "../../Shared/itemTypeService";
import ItemBoxHeader from "../ItemBoxHeader";
import ItemIcon from "../ItemIcon";

export interface ItemBoxProps {
    itemImage: string;
    itemType: ItemTypes['type'];
    children?: React.ReactNode;
};

export interface ItemTypes {
    type: 'common' | 'uncommon' | 'legendary' | 'boss' | 'lunar' | 'equipment';
};

const ItemBox = (props: ItemBoxProps) => {
    return (
        <Flex
            bg='shared.backgroundColour'
            color='shared.textColour'
            flex='1'
            outline='1px solid'
            outlineColor={ getThemeBorderColour(props.itemType) }
            flexDirection='column'
        >
            <ItemBoxHeader itemType={ props.itemType }>
                Test
            </ItemBoxHeader>
            <Flex padding='5px' gap='10px'>
                <ItemIcon image={ props.itemImage } />
                <Flex flex='1'>
                    { props.children }
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ItemBox;