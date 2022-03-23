import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import PersonDisplay from './index';

export default {
    title: 'Custom/PersonDisplay',
    component: PersonDisplay,
    argTypes: {}
} as ComponentMeta<typeof PersonDisplay>;

const Template: ComponentStory<typeof PersonDisplay> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <PersonDisplay />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
};