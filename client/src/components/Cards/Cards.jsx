import { useDispatch , useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar'
import { getPokes } from '../../Redux/actions';
import style from './Cards.module.css';

const Cards = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.pokemons);

    useEffect(() => {
        dispatch(getPokes())
    }, [dispatch]);

//---------------------------------------------------------
    const [pokemons , setPokemons] = useState([]);

    useEffect(() => {
        setPokemons([...allPokemons].splice(0, itemsPerPage));
      }, [allPokemons]);
//---------------------------------------------------------

    const [currentPage , setCurrentPage] = useState(1);

//------------------------------------------------ PAGINADO
    const itemsPerPage = 12;

    const nextHandler = () => {
        const totalElementos = allPokemons.length;
        
        const nextPage = currentPage + 1;

        const firstIndex = (nextPage - 1) * itemsPerPage; // -1 por el Índice

        if(firstIndex === totalElementos) return;
        
        setPokemons([...allPokemons].splice(firstIndex , itemsPerPage))

        setCurrentPage(nextPage)
      };
    
      const prevHandler = () => {
        const prevPage = currentPage - 1;

        if(prevPage <= 0) return;

        const firstIndex = (prevPage - 1) * itemsPerPage;  // -1 por el Índice

        setPokemons([...allPokemons].splice(firstIndex , itemsPerPage))

        setCurrentPage(prevPage);
      };
//------------------------------------------------

    return (
        <div className={style.container}>
            <SearchBar/>
            <div className={style.buttons_container}>
                <button onClick={prevHandler}>&#60;</button>
                <p>{currentPage}</p>
                <button onClick={nextHandler}>&#62;</button>
            </div>
            <div className={style.cards_container}>
                {
                    pokemons?.map( pokemon => {
                        return (
                            <Card
                            key={pokemon?.id}
                            id={pokemon?.id}
                            image={pokemon?.image}
                            name={pokemon?.name}
                            type={pokemon?.type?.map(type => type.name).join(' ')}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
};

export default Cards;