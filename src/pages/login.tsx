import { Alert, AlertIcon, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { error } from "console";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth/authContext";

const LoginPage = () => {
    const auth = useContext(AuthContext);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleEmailAddressChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailAddress(event.target.value);
    }

    const handlePasswordChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLoginWithEmailAndPassword = () => {
        auth?.signInWithEmail(emailAddress, password);
    }

    const handleLoginWithGoogle = () => {
        auth?.signInWithGoogle();
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
                Welcome!
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
                <Input onChange={handleEmailAddressChangeEvent} placeholder='Email address' />
                <Input onChange={handlePasswordChangeEvent} placeholder='Password' type='password' />
            </Flex>
            <Button onClick={handleLoginWithEmailAndPassword}>Sign in</Button>
            <Text>or</Text>
            <Button onClick={handleLoginWithGoogle}>Sign in with Google</Button>
            <Text>Not got an account? <Link to='/signup'>Sign up here.</Link></Text>
        </Flex>
    );
};

export default LoginPage;