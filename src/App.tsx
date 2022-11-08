import { useEffect, useState } from 'react';
import './App.css';
import { Box, Flex, Image } from '@chakra-ui/react';
import PersonDisplay from './Components/PersonDisplay';
import { Game, GetSharedGamesRequest, Person } from './Types/app.type';
import GamesDisplay from './Components/GamesDisplay';
import FriendsDisplay from './Components/FriendsDisplay';
import steamService from './services/steamService';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFindingGames, setIsFindingGames] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>('');
  const [sharedGames, setSharedGames] = useState<Game[]>([]);

  useEffect(() => {
    if (people.length === 1)
    {
      setSharedGames([]);
    }
    else
    {
      updateSharedGames();
    }
  }, [people, sharedGames]);

  // Potentially pull some of these out into hooks
  const doesPlayerAlreadyExistsInCollection = (steamId: string) : boolean => {
    let alreadyExists: boolean = false;
    people.forEach(p => {
        if(p.steamid === steamId)
            alreadyExists = true;
    });

    return alreadyExists;
  };

  // This needs to be split out, searching and adding should be separate functions
  const searchForPerson = async (steamId: string) => {

    if (steamId === '')
    {
      setSearchError('Steam id cannot be empty!');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    let alreadyExists = doesPlayerAlreadyExistsInCollection(steamId);

    if(alreadyExists)
    {
        setSearchError('Steam account already in the list.')
        setIsSearching(false);
        return;
    }

    const player = await steamService.getSteamPersonById(steamId);

    const tmpPerson: Person = {
        avatar: player.avatarmedium,
        personaname: player.personaname,
        profileurl: player.profileurl,
        steamid: player.steamid,
        communityVisibilityState: player.communityvisibilitystate
    };
    
    setPeople([...people, tmpPerson]);
    setIsSearching(false);
  };

  const addFriendToPlayerList = async (steamId: string) => {
    // TODO: This needs to be refactored too D: 
    await searchForPerson(steamId);
  };

  const removePerson = (steamId: string) => {
      let index = people.findIndex(p => 
          p.steamid === steamId);

      if(index !== -1)
      {
          let tmpArray = [...people];
          tmpArray.splice(index, 1);
          setPeople(tmpArray);
      }
  };

  const updateSharedGames = async () => {
    if (people?.length > 1)
    {
      setIsFindingGames(true);

      let payload: GetSharedGamesRequest = {
        steamIds: people.map(p => p.steamid)
      };

      const result = await steamService.getSharedGames(payload);

      setSharedGames(result.sharedGames);
      setIsFindingGames(false);
    }
  };

  return (

    <Box height='100vh' bg='gray.800' color='shared.textColour'>
      <Flex flex='1' flexDirection='row' gap='100px' justifyContent='center'>
        <Flex justifyContent='right' flexDirection='column'gap='100px'>
          <Flex flexDirection='column' height='100vh' minWidth='400px' maxWidth='400px'>
            <PersonDisplay
              searchForPerson={ searchForPerson }
              removePerson={ removePerson }
              error={ searchError }
              isSearching={ isSearching }
              people={ people }
            />
            <FriendsDisplay 
              onSelectFriend={ addFriendToPlayerList }
              people={ people }
            />
            <Image src='/wcwp-logo-svg.svg' />
          </Flex>
        </Flex>
        <Flex justifyContent='left'>
          <GamesDisplay 
            games={ sharedGames } 
            isLoading={ isFindingGames }
            enoughPlayersToDisplayGames={ people.length >= 2}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
