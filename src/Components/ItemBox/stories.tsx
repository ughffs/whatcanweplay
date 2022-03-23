import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '../../theme';
import ItemBox, { ItemBoxProps } from './index';
import TestImage from '../../Assets/Images/Uncommon/bandolier.png';

export default {
    title: 'Custom/ItemBox',
    component: ItemBox,
    argTypes: {}
} as ComponentMeta<typeof ItemBox>;

const Template: ComponentStory<typeof ItemBox> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <Flex flex='1' bg='black' padding='20px'>
                <ItemBox { ...args }>
                    Test
                </ItemBox>
            </Flex>
        </ChakraProvider>
    )
};

export const Uncommon = Template.bind({});
Uncommon.args = {
    itemType: 'uncommon',
    itemImage: TestImage
};

export const Common = Template.bind({});
Common.args = {
    itemType: 'common',
    itemImage: TestImage
};

export const Legendary = Template.bind({});
Legendary.args = {
    itemType: 'legendary',
    itemImage: TestImage
};

export const Boss = Template.bind({});
Boss.args = {
    itemType: 'boss',
    itemImage: TestImage
};

export const Lunar = Template.bind({});
Lunar.args = {
    itemType: 'lunar',
    itemImage: TestImage
};

export const Equipment = Template.bind({});
Equipment.args = {
    itemType: 'equipment',
    itemImage: TestImage
};