import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import ItemBoxHeader from './index';

export default {
    title: 'Custom/ItemBoxHeader',
    component: ItemBoxHeader,
    argTypes: {}
} as ComponentMeta<typeof ItemBoxHeader>;

const Template: ComponentStory<typeof ItemBoxHeader> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <ItemBoxHeader { ...args } />
        </ChakraProvider>
    )
};


export const Main = Template.bind({});
Main.args = {
    itemType: 'common'
};