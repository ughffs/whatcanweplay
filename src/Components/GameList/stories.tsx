import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import GameList from './index';

export default {
    title: 'Custom/GameList',
    component: GameList,
    argTypes: {}
} as ComponentMeta<typeof GameList>;

const Template: ComponentStory<typeof GameList> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <GameList { ...args } />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
    games: [
        {
            appid: 123,
            name: 'Test Game',
            icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/4000/4a6f25cfa2426445d0d9d6e233408de4d371ce8b.jpg'
        },
        {
            appid: 123,
            name: 'Test Game',
            icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/4000/4a6f25cfa2426445d0d9d6e233408de4d371ce8b.jpg'
        },
        {
            appid: 123,
            name: 'Test Game',
            icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/4000/4a6f25cfa2426445d0d9d6e233408de4d371ce8b.jpg'
        },
        {
            appid: 123,
            name: 'Test Game',
            icon: 'http://media.steampowered.com/steamcommunity/public/images/apps/4000/4a6f25cfa2426445d0d9d6e233408de4d371ce8b.jpg'
        }
    ]
};