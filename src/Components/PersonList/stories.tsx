import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import PersonList from './index';

export default {
    title: 'Custom/PersonList',
    component: PersonList,
    argTypes: {}
} as ComponentMeta<typeof PersonList>;

const Template: ComponentStory<typeof PersonList> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <PersonList { ...args } />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
    people:
    [
        {
            avatar: '',
            personaname: '',
            profileurl: '',
            steamid: '',
            communityVisibilityState: 3
        }
    ]
};