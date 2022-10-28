import axios from "axios";
import { useState } from "react";
import PersonList from "../PersonList";
import SearchForm from "../SearchForm";
import { Person, SteamPerson } from "../../Types/app.type";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Flex, Heading, Select, Text } from "@chakra-ui/react";
import PersonSelect from "../PersonSelect";

export interface FriendsDisplayProps { 
    people: Person[];
    isSearching: boolean;
    error: string;
};

const FriendsDisplay = (props: FriendsDisplayProps) => {

    const handlePersonSelect = (steamId: string) => {
        console.log('person selected: ' + steamId)
    };

    return (
        <Accordion allowToggle padding='10px'>
            <AccordionItem border='none'>
                <h3>
                    <AccordionButton paddingLeft='0' _focus={{ boxShadow: 'unset' }}>
                        <Box flex='1' textAlign='left'>
                            <Heading as='h2' size='md'>Add from friends</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h3>
                <AccordionPanel paddingLeft='0' paddingRight='0'>
                    <Flex 
                        gap='20px'
                        flexDirection='column'
                    >
                        <Flex>
                            <Text fontSize='sm'>Select a person to view their friends list.</Text>
                        </Flex>

                        <PersonSelect 
                            people={ props.people }
                            onSelect={ handlePersonSelect }
                        />
                            
                        {
                            props.error !== '' && 
                            <Alert status='warning' color='gray.800' borderRadius='sm'>
                                <AlertIcon />
                                { props.error }
                            </Alert>
                        }

                    </Flex>  
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default FriendsDisplay;