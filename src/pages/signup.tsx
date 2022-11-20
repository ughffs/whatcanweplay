import { Alert, AlertIcon, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth/authContext";
import validator from 'validator';
import { useUserRecord } from "../hooks/useUserRecord";

const SignUpPage = () => {
    const auth = useContext(AuthContext);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const userRecord = useUserRecord();
    const navigate = useNavigate();

    const handleEmailAddressChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailAddress(event.target.value);
    }

    const handlePasswordChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSignUp = () => {
        // Reset any errors
        setError('');

        if (!validator.isEmail(emailAddress)) {
            setError('Invalid email address.');
            return;
        }

        if (!validator.isStrongPassword(password)) {
            setError('Password not strong enough.');
            return;
        }

        auth?.createUserAccount(emailAddress, password)
            .then(result => {
                console.log('test')
                const userId = result.user.uid;
                userRecord.createUserRecord(userId, emailAddress)
                    .then(() => navigate('/accountsetup'))
                    .catch(error => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <Flex 
            justifyContent='center'
            alignItems='center'
        >
            <Flex 
                height='100vh' 
                bg='gray.800' 
                color='shared.textColour' 
                justifyContent='center' 
                alignItems='center'
                flexDirection='column'
                gap='10px'
                width='350px'
            >
                <Heading size='lg' marginBottom='20px'>
                    Join us!
                </Heading>
                {
                    error !== '' && 
                    <Alert status='warning' color='gray.800' borderRadius='sm'>
                        <AlertIcon />
                        { error }
                    </Alert>
                }
                <Input onChange={handleEmailAddressChangeEvent} placeholder='Email address' />
                <Input onChange={handlePasswordChangeEvent} placeholder='Password' type='password' />
                <Flex flexDirection='column'>
                    <Text>Password Requirements:</Text>
                    <Text>Minimum length: 8</Text>
                    <Text>Minimum lowercase characters: 1</Text>
                    <Text>Minimum uppercase characters: 1</Text>
                    <Text>Minimum numerical characters: 1</Text>
                    <Text>Minimum symbol characters: 1</Text>
                </Flex>
                <Button onClick={handleSignUp}>Sign up</Button>
                <Text>We do not share any data.</Text>
                <Text>Already have an account? <Link to='/login'>Login here.</Link></Text>
            </Flex>
        </Flex>
    );
};

export default SignUpPage;