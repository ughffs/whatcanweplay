import { Flex } from "@chakra-ui/react";
import { Person } from "../../Types/app.type";
import PersonCard from "../PersonCard";

export interface PersonListProps {
    people: Person[];
    onPersonClick: (steamId: string) => void;
};

const PersonList = (props: PersonListProps) => {
    return (
        <Flex 
            flex='1'
            flexDirection='column'
            gap='10px'
            marginRight='5px'
        >
            {
                props.people.map(p =>
                    <PersonCard 
                        key={ p.steamid }
                        steamId={ p.steamid }
                        avatarUrl={ p.avatar }
                        username={ p.personaname }
                        onClick={ props.onPersonClick }
                    />
                )
            }
        </Flex>
    );
};

export default PersonList;