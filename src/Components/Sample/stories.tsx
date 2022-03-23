import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import Sample from './index';

export default {
    title: 'Custom/Sample',
    component: Sample,
    argTypes: {}
} as ComponentMeta<typeof Sample>;

const Template: ComponentStory<typeof Sample> = () => {
    return(
        <ChakraProvider theme={theme}>
            <Sample></Sample>
        </ChakraProvider>
    )
};

export const Main = Template.bind({});