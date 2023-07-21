import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar'
import Filter from '../Filter/Filter';
import { getPokes , getDbPokes , setCurrentPage } from '../../Redux/actions';
import style from './Cards.module.css';

const Cards = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.pokemons);

    useEffect(() => {
        if (allPokemons.length === 0) {
        dispatch(getPokes());
        dispatch(getDbPokes());
        }
    }, [dispatch, allPokemons]);

//---------------------------------------------------------

    const currentPage = useSelector(state => state.currentPage);


//------------------------------------------------ PAGINADO

    const itemsPerPage = 12;
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = firstIndex + itemsPerPage;
    const groupSlice = allPokemons?.slice(firstIndex , endIndex);
    const hasNextPage = endIndex < allPokemons.length;
    
    
    const handlePage = (pag)=>{
        dispatch(setCurrentPage(pag));
    };

//---------------------------------------------------------

    return (
        <div className={style.container}>
            
            <SearchBar/>

            <div className={style.buttons_container}>
                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>&#60;</button>

                <p>{currentPage}</p>

                <button onClick={() => handlePage(currentPage + 1)} disabled={!hasNextPage}>&#62;</button>
            </div>

            <Filter/>
    
            <div className={style.cards_container}>
                {
                    groupSlice.map( pokemon => {
                        return (
                            <Card
                            key={pokemon?.id}
                            id={pokemon?.id}
                            image={pokemon?.image}
                            name={pokemon?.name}
                            type={
                                pokemon?.type 
                                ? pokemon?.type?.map(type => type.name.charAt(0).toUpperCase() + type.name.substring(1)).join(' - ') 
                                : pokemon?.types?.map(type => type.type.charAt(0).toUpperCase() + type.type.substring(1)).join(' - ')
                            }
                            attack={pokemon?.attack}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
};

export default Cards;