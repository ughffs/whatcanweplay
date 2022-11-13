import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/authContext";

const SignUpPage = () => {
    const auth = useContext(AuthContext);

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
                <Input placeholder='Email address' />
                <Input placeholder='Password' type='password' />
                <Button onClick={handleSignUp}>Sign up</Button>
                <Text>We do not share any data.</Text>
            </Flex>
        </Flex>
    );
};

export default SignUpPage;