import { Box, Button, Flex, FormControl, Input, Select } from "@chakra-ui/react";
import { prependOnceListener } from "process";
import React, { ChangeEventHandler, useState } from "react";
import { Person } from "../../Types/app.type";

export interface PersonSelectProps {
    people: Person[];
    onSelect: (steamId: string) => void;
};

const PersonSelect = (props: PersonSelectProps) => { 
    const [selectedOption, setSelectedOption] = useState<string>();

    const isSelectionInArray = (steamId: string) : boolean => {
        if (props.people.some(person => person.steamid == steamId)) {
            return true;
        }

        return false;
    };  

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let selectedSteamId = event.target.value;
        if (isSelectionInArray(selectedSteamId)) {
            props.onSelect(selectedSteamId);
            setSelectedOption(selectedSteamId);
        }
    };

    return (
        <>
            <Select 
                variant='outline' 
                placeholder='Select a person'
                onChange={ handleSelect }
            >
                {
                    props.people.map(person => 
                        <option 
                            key={ person.steamid + person.personaname } 
                            value={ person.steamid }
                        >
                            { person.personaname }
                        </option>
                    )
                }
            </Select>
        </>
    );
};

export default PersonSelect;