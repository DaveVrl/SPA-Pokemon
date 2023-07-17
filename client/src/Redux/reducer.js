import { GET_POKES , GET_TYPES, GET_POKE_NAME, GET_POKE_ID, FILTER_ORDER, FILTER_TYPE, ORDER_BY_ATTACK, FILTER_ORIGIN, CREATE_POKE, GET_DB_POKES, CLEAR_POKEMON, CLEAR_DETAIL } from "./action-types";

const initialState = {
    pokemons: [], 
    types: [],
    pokemon: [], //name
    id: [],
    allPokes: [],
    db:[]
}

const reducer = (state = initialState , action) => {
    
    const allPokemonsCopy = [ ...state.pokemons];
    
    switch (action.type) {
        case GET_POKES:
            return {
                ...state,
                pokemons: [...state.db , ...action.payload],
                allPokes: [...state.db , ...action.payload]
            };
            
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };
        
        case GET_POKE_NAME:
            return {
                ...state,
                pokemon: action.payload
            };
        
        case GET_POKE_ID:
            return {
                ...state,
                id: action.payload
            };

        case FILTER_ORDER:
            return {
                ...state,
                pokemons:
                action.payload === "A"
                ? allPokemonsCopy.sort((a,b) => a.name.localeCompare(b.name))
                : allPokemonsCopy.sort((a,b) => b.name.localeCompare(a.name)) 
            };

        case ORDER_BY_ATTACK:
            return {
                ...state,
                pokemons:
                action.payload === "A"
                ? allPokemonsCopy.sort((a,b) => a.attack - b.attack)
                : allPokemonsCopy.sort((a,b) => b.attack - a.attack)
            }

//Agrego verificación adicional para asegurarnos de que pokemon.type y pokemon.types existenten antes de aplicar find.
//Esto evita que se produzca el error si alguna de las propiedades no está definida en el objeto pokemon.
            case FILTER_TYPE:
                const pokeApiFilter = state.allPokes.filter(pokemon => pokemon.type && pokemon.type.find(type => type.name === action.payload));
                const pokeDbFilter = state.db.filter(pokemon => pokemon.types && pokemon.types.find(type => type.type === action.payload));
  
                const filteredPokemons = [...pokeApiFilter, ...pokeDbFilter];
  
                return {
                  ...state,
                  pokemons: action.payload === "allTypes" ? [...state.allPokes] : filteredPokemons
                };


            case FILTER_ORIGIN:
                let allPokeOriginFiltered;

                if(action.payload === "api") {
                     allPokeOriginFiltered = state.allPokes.filter(pokemon => typeof pokemon.id === 'number')
                }

                if(action.payload === "db") {
                     allPokeOriginFiltered = state.allPokes.filter(pokemon => typeof pokemon.id === 'string')
                }
                return {
                  ...state,
                  pokemons:
                    action.payload === "all"
                      ? [...state.allPokes]
                      : allPokeOriginFiltered
                };

            case CREATE_POKE:
                return {
                    ...state,
                    db: [...state.db, action.payload]
                };

            case GET_DB_POKES:
                return {
                    ...state,
                    db: action.payload
                };

            case CLEAR_POKEMON: //name
                return {
                    ...state,
                    pokemon: action.payload
                };

            case CLEAR_DETAIL:
                return {
                    ...state,
                    id: action.payload
                };
        
            
    
        default:
            return { ...state };
    }
};

export default reducer;