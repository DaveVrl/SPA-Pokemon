import { getPokeName , clearPokemon , setShowCard } from "../../Redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./SearchBar.module.css";


const SearchBar = () => {
    const dispatch = useDispatch();

    const pokemon = useSelector(state => state.pokemon);
    const showCard = useSelector(state => state.showCard);

    const [name , setName] = useState("");
    

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const submitHandler = () => {
        dispatch(getPokeName(name));
        dispatch(setShowCard(true));
        setName("");
        
    }

    const closeCard = () => {
        dispatch(setShowCard(false));
        dispatch(clearPokemon());
    }

    return (
        <div className={style.container}>
            <p className={style.pSearch}>Search your favorite Pokémon!</p>
            <div className={style.barBtn}>
            <input value={name} className={style.searchInput} type="search" onChange={(event) => handleChange(event)} placeholder="Search By Name..."/>
            <button className={style.searchBtn} type="submit" onClick={() => submitHandler(name)}>&#128269;</button>
            </div>
            {showCard && pokemon.length > 0 && pokemon[0].name && (
                    <div className={style.card_container}>
                    <button className={style.clsBtn} onClick={closeCard}>X</button>
                    <Card
                    key={pokemon[0]?.id}
                    id={pokemon[0]?.id}
                    image={pokemon[0]?.image}
                    name={pokemon[0]?.name}
                    type={pokemon[0]?.type ? pokemon[0]?.type?.map(type => type.name).join(' ') : pokemon[0]?.types?.map(type => type.type).join(' ')}
                    attack={pokemon[0]?.attack}
                    />
                    </div>
            )}
        </div>
    )
};

export default SearchBar;