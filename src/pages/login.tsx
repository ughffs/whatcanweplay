import { Box, Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/authContext";

const LoginPage = () => {
    const auth = useContext(AuthContext);

    return (
        <Flex height='100vh' bg='gray.800' color='shared.textColour' justifyContent='center' alignItems='center'>
            <Button onClick={auth?.signInWithGoogle}>Sign In with Google</Button>
        </Flex>
    );
};

export default LoginPage;