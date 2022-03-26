import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import PersonCard from './Components/PersonCard';
import SearchForm from './Components/SearchForm';
import PersonDisplay from './Components/PersonDisplay';
import { Game, GetSharedGamesRequest, GetSharedGamesResponse, Person, SteamPerson } from './Types/app.type';
import axios from 'axios';
import GameList from './Components/GameList';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFindingGames, setIsFindingGames] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>('');
  const [sharedGames,setSharedGames] = useState<Game[]>([]);

  useEffect(() => {
    updateSharedGames();
  }, [people]);

  const searchForPerson = async (steamId: string) => {


    if (steamId === '')
    {
      setSearchError('Steam id cannot be empty!');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    let alreadyExists: boolean = false;
    people.forEach(p => {
        if(p.steamid === steamId)
            alreadyExists = true;
    });

    if(alreadyExists)
    {
        setSearchError('Steam account already in the list.')
        setIsSearching(false);
        return;
    }

    const resp = await axios.get<SteamPerson>('http://localhost:1234/steam/user/', {
        params: {
            steamid: steamId
        }
    });

    const player = resp.data.response.players[0];
    const tmpPerson: Person = {
        avatar: player.avatarmedium,
        personaname: player.personaname,
        profileurl: player.profileurl,
        steamid: player.steamid
    };
    
    setPeople([...people, tmpPerson]);
    setIsSearching(false);
  };

  const removePerson = (steamId: string) => {
      let index = people.findIndex(p => 
          p.steamid === steamId);

      if(index != -1)
      {
          let tmpArray = [...people];
          tmpArray.splice(index, 1);
          setPeople(tmpArray);
      }
  };

  const updateSharedGames = async () => {
    if (people?.length > 1)
    {
      console.log('people array is > 0');
      setIsFindingGames(true);

      console.log(people);
      let something = people.map(p => p.steamid);
      let payload: GetSharedGamesRequest = {
        steamIds: people.map(p => p.steamid)
      };

      console.log(something);

      const resp = await axios.post<GetSharedGamesResponse>(
        'http://localhost:1234/steam/games',
        payload
      );
      console.log(resp.data);
      setSharedGames(resp.data.sharedGames);
      setIsFindingGames(false);
    }
  };

  let games;

  if (isFindingGames)
  {
    games = <Spinner />
  }
  else 
  {
    games = <GameList games={ sharedGames } />

  }

  return (

    <Box height='100vh' bg='gray.800' color='shared.textColour'>
      <Flex flex='1' flexDirection='row'>
        <Flex flex='1' justifyContent='center'>
          <PersonDisplay
            searchForPerson={ searchForPerson }
            removePerson={ removePerson }
            error={ searchError }
            isSearching={ isSearching }
            people={ people }
          />
        </Flex>
        <Flex>
          {
            games 
          }
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
