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
      <Flex flex='1' justifyContent='center'>
        <PersonDisplay />
      </Flex>
    </Box>
  );
}

export default App;
