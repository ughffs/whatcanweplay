import { Person } from "../../Types/app.type";
import PersonCard from "../PersonCard";

export interface PersonListProps {
    people: Person[];
};

const PersonList = (props: PersonListProps) => {
    return (
        <>
            {
                props.people.map(p =>
                    <PersonCard 
                        key={ p.steamid }
                        avatarUrl={ p.avatar }
                        username={ p.personaname }
                    />
                )
            }
        </>
    );
};

export default PersonList;