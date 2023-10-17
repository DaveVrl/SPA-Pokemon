import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar'
import Filter from '../Filter/Filter';
import { getPokes , getDbPokes , setCurrentPage , setLoading } from '../../Redux/actions';
import style from './Cards.module.css';
import load from '../assets/loading.gif';
import imgTypesObj from '../imgTypesObj';

const Cards = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.pokemons);
    const loading = useSelector(state => state.loading);

    useEffect(() => {
        if (allPokemons.length === 0) {
            dispatch(setLoading(true)); // Comienza la carga si no hay pokemons
            Promise.all([dispatch(getPokes()), dispatch(getDbPokes())])
                .then(() => dispatch(setLoading(false))); // Finaliza la carga después de obtener los pokemons y pokemons de la base de datos
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

//------------------------------------- NUMEROS DE PAGINADO

    const totalItems = allPokemons.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageRange = 10; // Puedes ajustar este valor según tus necesidades
    const currentPageGroup = Math.ceil(currentPage / pageRange);
    const startPage = (currentPageGroup - 1) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

//---------------------------------------------------------

return (
    <div className={style.container}>

        {loading ? (
            <div className={style.loading}>
                <img className={style.loadgif} src={load} alt="loading..." /></div>
        ) : (
            <>
            <SearchBar />
            <Filter />
            <div className={style.cards_container}>
                {groupSlice.map(pokemon => (
                    <Card
                        key={pokemon?.id}
                        id={pokemon?.id}
                        image={pokemon?.image}
                        name={pokemon?.name}
                          ////////////////////////////////////
                        type={
                            pokemon?.type
                              ? (
                                <div className={style.types}>
                                  {pokemon?.type?.map(type => {
                                    const typeName = type.name;
                                    if (imgTypesObj[typeName]) {
                                      return (
                                        <img
                                          key={typeName}
                                          src={imgTypesObj[typeName]}
                                          alt={typeName}
                                        />
                                      );
                                    }
                                    return typeName;
                                  })}
                                </div>
                              )
                              : (
                                <div className={style.types}>
                                  {pokemon?.types?.map(type => {
                                    const typeName = type.type;
                                    if (imgTypesObj[typeName]) {
                                      return (
                                        <img
                                          key={typeName}
                                          src={imgTypesObj[typeName]}
                                          alt={typeName}
                                        />
                                      );
                                    }
                                    return typeName;
                                  })}
                                </div>
                              )
                          }
                          ////////////////////////////////////
                        attack={pokemon?.attack}
                        hp={pokemon?.hp}
                    />
                ))}
            </div>
            </>
        )}

        <div className={style.buttons_container}>
            {!loading && (
                <>
                    <button className={style.btn_move} onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>&#60;</button>

                    <div className={style.page_numbers}>
                        {pageNumbers.map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePage(pageNum)}
                                className={pageNum === currentPage ? style.active_page : ''}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button className={style.btn_move} onClick={() => handlePage(currentPage + 1)} disabled={!hasNextPage}>&#62;</button>
                </>
            )}
        </div>
    </div>
)};


export default Cards;
