import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card';
import { getPokes } from '../../Redux/actions';

const Cards = () => {
    const dispatch = useDispatch();

    const { pokemons } = useSelector(state => state);

    
    useEffect(() => {
        dispatch(getPokes())
    },/*[] va el array de dependencia pero lo saco por el msj en consola*/)

    return (
        <div>
            {
            pokemons?.map( pokemon => {

                const types = pokemon?.type?.map(type => type.name); 
                const typeString = types.join(' '); 

                return (
                    <Card
                    key={pokemon?.id}
                    id={pokemon?.id}
                    image={pokemon?.image}
                    name={pokemon?.name}
                    type={typeString}
                    />
                );
            })
            }
        </div>
    )
};

export default Cards;