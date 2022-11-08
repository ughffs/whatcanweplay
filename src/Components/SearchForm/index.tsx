import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export interface SearchFormProps {
    onSubmit: (steamId: string) => void;
    isLoading: boolean;
};

const SearchForm = (props: SearchFormProps) => { 
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        props.onSubmit(inputValue);
        setInputValue('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <Flex
                display='flex' 
                gap='5px'
            >
                <Input 
                    placeholder='Steam id'
                    value={ inputValue }
                    onChange={ handleInputChange }
                />
                <Button 
                    colorScheme='teal' 
                    variant='outline'
                    onClick={ handleSubmit } 
                    isLoading={ props.isLoading }
                >
                    Add
                </Button>
            </Flex>
        </>
    );
};

export default SearchForm;