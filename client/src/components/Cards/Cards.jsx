import { useDispatch , useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar'
import Filter from '../Filter/Filter';
import { getPokes } from '../../Redux/actions';
import style from './Cards.module.css';

const Cards = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.pokemons);

    useEffect(() => {
        dispatch(getPokes())
    }, [dispatch]);

//---------------------------------------------------------

    const [currentPage , setCurrentPage] = useState(1);

//------------------------------------------------ PAGINADO

    const itemsPerPage = 12;
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = firstIndex + itemsPerPage;
    const groupSlice = allPokemons?.slice(firstIndex , endIndex);
    const hasNextPage = endIndex < allPokemons.length;

    const handlePage = (pag)=>{
        setCurrentPage(pag)
    }
 
//---------------------------------------------------------

    return (
        <div className={style.container}>
            <SearchBar/>

            <div className={style.buttons_container}>
                
                {currentPage !== 1 && (
                <button onClick={() => handlePage(currentPage - 1)}>&#60;</button>)}
                <p>{currentPage}</p>
                {hasNextPage && (
                <button onClick={() => handlePage(currentPage + 1)}>&#62;</button>)}
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