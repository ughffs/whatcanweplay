import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import GameCard from './index';

export default {
    title: 'Custom/GameCard',
    component: GameCard,
    argTypes: {}
} as ComponentMeta<typeof GameCard>;

const Template: ComponentStory<typeof GameCard> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <GameCard { ...args } />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
    game: {
        appid: 123,
        icon: 'https://bit.ly/dan-abramov',
        name: 'test'
    }
};