import { Alert, AlertIcon, Button, Flex, Heading, Input, Link, Text } from "@chakra-ui/react"
import { error } from "console"

const setupAccount = () => {
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
                <Text marginBottom='10px'>
                    Enter your numerical steam id here, so you can easily add yourself to the compare tool without having to fetch your id each time!
                </Text>
                <Input  placeholder='Numerical steam id' />
            </Flex>
            <Button>Save</Button>
        </Flex>
    )
}

export default setupAccount;
export const SetupAccount = setupAccount;