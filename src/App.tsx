import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Flex } from '@chakra-ui/react';
import PersonCard from './Components/PersonCard';
import SearchForm from './Components/SearchForm';
import PersonDisplay from './Components/PersonDisplay';

function App() {
  return (
    <Box height='100vh' bg='gray.800' color='shared.textColour'>
      <Flex flex='1'>
        <PersonDisplay />
        <PersonCard 
          avatarUrl='https://bit.ly/dan-abramov'
          username='azerbijon123'
        />
      </Flex>
    </Box>
  );
}

export default App;
