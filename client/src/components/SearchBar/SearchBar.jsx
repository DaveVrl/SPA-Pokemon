import { getPokeName } from "../../Redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./SearchBar.module.css";


const SearchBar = () => {
    const dispatch = useDispatch();

    const pokemon = useSelector(state => state.pokemon);

    const [name , setName] = useState("");
    const [showCard, setShowCard] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const submitHandler = () => {
        dispatch(getPokeName(name));
        setShowCard(true);
    }

    const closeCard = () => {
        setShowCard(false);
    }

    return (
        <div className={style.container}>
            <div>
            <input type="search" onChange={(event) => handleChange(event)} placeholder="Search By Name..."/>
            <button type="submit" onClick={() => submitHandler(name)}>Buscar</button>
            </div>
            {showCard && pokemon.length > 0 && pokemon[0].name && (
                    <div className={style.card_container}>
                    <Card
                    key={pokemon[0]?.id}
                    id={pokemon[0]?.id}
                    image={pokemon[0]?.image}
                    name={pokemon[0]?.name}
                    type={pokemon[0]?.type ? pokemon[0]?.type?.map(type => type.name).join(' ') : pokemon[0]?.types?.map(type => type.type).join(' ')}
                    />
                    <button onClick={closeCard}>Close</button>
                    </div>
            )}
        </div>
    )
};

export default SearchBar;