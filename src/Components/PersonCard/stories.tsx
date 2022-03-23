import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import PersonCard from './index';

export default {
    title: 'Custom/PersonCard',
    component: PersonCard,
    argTypes: {}
} as ComponentMeta<typeof PersonCard>;

const Template: ComponentStory<typeof PersonCard> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <PersonCard { ...args } />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
    avatarUrl: 'https://bit.ly/dan-abramov',
    username: 'azerbijon123'
};