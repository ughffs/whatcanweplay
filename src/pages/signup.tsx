import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth/authContext";

const SignUpPage = () => {
    const auth = useContext(AuthContext);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailAddressChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailAddress(event.target.value);
    }

    const handlePasswordChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSignUp = () => {
        // as long as the inputs aren't empty
        // call the auth context with params.
        // Page will auto-redirect.
        // Display error if something is wrong.
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
                <Input onChange={handleEmailAddressChangeEvent} placeholder='Email address' />
                <Input onChange={handlePasswordChangeEvent} placeholder='Password' type='password' />
                <Button onClick={handleSignUp}>Sign up</Button>
                <Text>We do not share any data.</Text>
                <Text>Already have an account? <Link to='/login'>Login here.</Link></Text>
            </Flex>
        </Flex>
    );
};

export default SignUpPage;