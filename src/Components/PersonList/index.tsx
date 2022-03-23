import axios from "axios";
import steamService from "../../Shared/steamService";
import { Person } from "../../Types/app.type";

export interface PersonListProps {
    people: Person[];
};

const PersonList = (props: PersonListProps) => {
    const makeCall = async () => {
        const resp = await axios.get('http://localhost:1234/steam/user?steamid=76561198054228884');
        console.log(resp.data);
    };

    makeCall(); 

    return (
        <>
        </>
    );
};

export default PersonList;