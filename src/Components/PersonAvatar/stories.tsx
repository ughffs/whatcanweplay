import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import PersonAvatar from './index';

export default {
    title: 'Custom/PersonAvatar',
    component: PersonAvatar,
    argTypes: {}
} as ComponentMeta<typeof PersonAvatar>;

const Template: ComponentStory<typeof PersonAvatar> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <PersonAvatar { ...args } />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
    source: 'https://bit.ly/dan-abramov'
};