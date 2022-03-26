import { Person } from "../../Types/app.type";
import PersonCard from "../PersonCard";

export interface PersonListProps {
    people: Person[];
    onPersonClick: (steamId: string) => void;
};

const PersonList = (props: PersonListProps) => {
    return (
        <>
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
        </>
    );
};

export default PersonList;