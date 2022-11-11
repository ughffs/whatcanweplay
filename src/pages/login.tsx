import { Box, Button } from "@chakra-ui/react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { useState } from "react";


const loginPage = () => {

    const [authorisedUser, setAuthorisedUser] = useState<User | undefined>(undefined);
    const [isAuthorised, setIsAuthorised] = useState<boolean | string | null>(false || sessionStorage.getItem("accessToken"));


    return (
        <Box height='100vh' bg='gray.800' color='shared.textColour'>
            <Button>Sign in with Google</Button>
        </Box>
    )
}
