import { Flex } from "@chakra-ui/react";
import React from "react";
import { getThemeBackgroundColour, getThemeBorderColour, getThemeFontColour } from "../../Shared/itemTypeService";
import { ItemTypes } from "../ItemBox";

export interface ItemBoxHeaderProps {
    itemType: ItemTypes['type'];
    children: React.ReactNode;
};

const ItemBoxHeader = (props: ItemBoxHeaderProps) => {

    let background = getThemeBackgroundColour(props.itemType);
    return (
        <Flex
            bg={ background }
            color={ getThemeFontColour(props.itemType) }
            flex='1'
            outline='1px solid'
            outlineColor={ getThemeBorderColour(props.itemType) }
            padding='3px'            
        >
            Test Header
        </Flex>
    );
};

export default ItemBoxHeader;