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
        auth?.signInWithEmail(emailAddress, password)
            .then(() => console.log('worked as expected'))
            .catch(error => {
                console.log(`Error object: ${error}`);
                console.log(error.code);
                handleLoginError(error)
            });
    }

    const handleLoginWithGoogle = () => {
        if(auth)
        {
            let provider = auth.providers.google;
            auth.signInWithSocialMedia(provider)
                .catch(error => handleLoginError(error));
        }
    }

    const handleLoginError = (error: any) => {
        switch (error.code) {
            case 'auth/invalid-email':
                setError('Invalid email address');
                break;
            case 'auth/user-disabled':
                setError('The user account associated with this email address has been disabled');
                break;
            case 'auth/user-not-found':
                setError('No account associated with this email address');
                break;
            case 'auth/wrong-password':
                setError('Incorrect password');
                break;
            default:
                setError('An unknown error has occurred. Please try again.');
                break;
        }
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