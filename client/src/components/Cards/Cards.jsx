import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card';
import { getPokes } from '../../Redux/actions';
import style from './Cards.module.css';

const Cards = () => {
    const dispatch = useDispatch();

    const pokemons = useSelector(state => state.pokemons);

///////////////////////////////////////////////////////////////////////////////

    const nextHandler = () => {
        console.log("next")
      }
    
      const prevHandler = () => {
        console.log("prev")
      }
    
    useEffect(() => {
        dispatch(getPokes())
    }, [dispatch] )

    return (
        <div className={style.container}>
            <div className={style.buttons_container}>
                <button onClick={prevHandler}>&#60;</button>
                <button onClick={nextHandler}>&#62;</button>
            </div>
            <div className={style.cards_container}>
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
        </div>
    )
};

export default Cards;