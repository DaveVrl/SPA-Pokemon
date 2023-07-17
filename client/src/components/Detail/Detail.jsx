import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokeId , clearDetail } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.id);
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getPokeId(id));

        return () => { //se llama solo una vez cuando se desmonta componente
            dispatch(clearDetail());
        }

    }, [dispatch , id]);

    return (
        <div className={style.general}>
            {
                <div className={style.containerGen}>
                    <div className={style.containerPj}>
                    <h2><span>Name: </span>{pokemon?.name && (
                    pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)
                    )}</h2>
                    <h2><span>HP: </span>{pokemon?.hp}</h2>
                    <h2><span>Attack: </span>{pokemon?.attack}</h2>
                    <h2><span>Defense: </span>{pokemon?.defense}</h2>
                    <h2><span>Speed: </span>{pokemon?.speed}</h2>
                    <h2><span>Height: </span>{pokemon?.height}</h2>
                    <h2><span>Weight: </span>{pokemon?.weight}</h2>
                    <h3 className={style.h3Type}><span>Types: </span>{
                    pokemon?.type 
                    ? pokemon?.type?.map(type => type.name.charAt(0).toUpperCase() + type.name.substring(1)).join(' - ') 
                    : pokemon?.types?.map(type => type.type.charAt(0).toUpperCase() + type.type.substring(1)).join(' - ')}</h3>
                    </div>
                    <div className={style.containerImg}>
                    <img src={pokemon?.image} alt={pokemon?.name} />
                    </div>
                </div>
            }
        </div>
    )
};

export default Detail;