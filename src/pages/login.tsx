import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth/authContext";

const LoginPage = () => {
    const auth = useContext(AuthContext);

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
            <Button onClick={auth?.signInWithGoogle}>Sign in with Google</Button>
            <Button>Sign in with Email Address and Password</Button>
            <Text>Not got an account? <Link to='/signup'>Sign up here.</Link></Text>
        </Flex>
    );
};

export default LoginPage;