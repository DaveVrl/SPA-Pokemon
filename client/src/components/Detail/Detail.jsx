import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokeId } from "../../Redux/actions";
import { useParams } from "react-router-dom";

const Detail = () => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.id);
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getPokeId(id))
    }, [dispatch , id]);


    console.log(pokemon)


    return (
        <div>
            {
                <div>
                    <div>
                    <h2><span>ID: </span>{pokemon?.id}</h2>
                    <h2><span>Name: </span>{pokemon?.name}</h2>
                    <h2><span>HP: </span>{pokemon?.hp}</h2>
                    <h2><span>Attack: </span>{pokemon?.attack}</h2>
                    <h2><span>Defense: </span>{pokemon?.defense}</h2>
                    <h2><span>Speed: </span>{pokemon?.speed}</h2>
                    <h2><span>Height: </span>{pokemon?.height}</h2>
                    <h2><span>Weight: </span>{pokemon?.weight}</h2>
                    <h3><span>Types: </span>{pokemon?.type?.map(type => type.name).join(' ')}</h3>
                    </div>
                    <img src={pokemon?.image} alt={pokemon?.name} />
                </div>
            }
        </div>
    )
};

export default Detail;