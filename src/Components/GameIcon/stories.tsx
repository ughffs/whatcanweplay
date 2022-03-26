import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import GameIcon from './index';

export default {
    title: 'Custom/GameIcon',
    component: GameIcon,
    argTypes: {}
} as ComponentMeta<typeof GameIcon>;

const Template: ComponentStory<typeof GameIcon> = (args) => {
    return(
        <ChakraProvider theme={theme}>
            <GameIcon { ...args } />
        </ChakraProvider>
    )
};

export const Main = Template.bind({});
Main.args = {
    source: 'https://bit.ly/dan-abramov'
};