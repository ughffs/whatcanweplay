import { Alert, AlertIcon, Button, Flex, Heading, Input, Link, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirstTimeLogin } from "../../hooks/useFirstTimeLogin"
import { useSteamId } from "../../hooks/useSteamId";

const SetupAccount = () => {
    const firstTimeLogin = useFirstTimeLogin();
    const steamIdRecord = useSteamId();
    const [steamId, setSteamId] = useState<string>('');
    const [error, setError] = useState<string>('');
    const firstLogin = useFirstTimeLogin();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(firstLogin);
        if(!firstLogin.isFirstLogin) {
            navigate('/');
        return;
        }
    }, [firstLogin.isFirstLogin])

    const handleOnSaveClick = async () => {
        setError('');
        if (!steamId) {
            setError('Steam Id cannot be empty!');
            return;
        }

        const cleanedSteamId = steamId.replace(/[^0-9]/g, '');

        try {
            await steamIdRecord.setSteamIdForLoggedInUser(cleanedSteamId);
            await firstTimeLogin.setIsFirstLoginToFalse();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnSkipClick = async () => {
        try {
            await firstTimeLogin.setIsFirstLoginToFalse();
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSteamIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSteamId(event.target.value);
    }

    return (
        <Flex 
            height='100vh' 
            bg='gray.800' 
            color='shared.textColour' 
            justifyContent='center' 
            alignItems='center'
            flexDirection='column'
            gap='10px'
        >
            <Heading size='lg' marginBottom='20px'>
                Almost done!
            </Heading>
            <Flex 
                bg='gray.800' 
                color='shared.textColour' 
                justifyContent='center' 
                alignItems='center'
                flexDirection='column'
                gap='10px'
                width='350px'
            >
                {
                    error !== '' && 
                    <Alert status='warning' color='gray.800' borderRadius='sm'>
                        <AlertIcon />
                        { error }
                    </Alert>
                }
                <Text marginBottom='10px'>
                    Enter your numerical steam id here, so you can easily add yourself to the compare tool without having to fetch your id each time!
                </Text>
                <Input onChange={handleSteamIdChange} placeholder='Numerical steam id' />
            </Flex>
            <Button onClick={handleOnSaveClick}>Save</Button>
            <Link onClick={handleOnSkipClick} textAlign='center'>Skip for now <br />(you will have to manually add your Id each time)</Link>
        </Flex>
    )
}

export default SetupAccount;