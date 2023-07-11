import { GET_POKES , GET_TYPES, GET_POKE_NAME, GET_POKE_ID, FILTER_ORDER, FILTER_TYPE, ORDER_BY_ATTACK, FILTER_ORIGIN} from "./action-types";

const initialState = {
    pokemons: [],
    types: [],
    pokemon: [],
    id: [],
    allPokes: []
}

const reducer = (state = initialState , action) => {
    
    const allPokemonsCopy = [ ...state.pokemons];

    switch (action.type) {
        case GET_POKES:
            return {
                ...state,
                pokemons: action.payload,
                allPokes: action.payload
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

        case FILTER_TYPE:
            const allPokeTypeFiltered = state.allPokes.filter(pokemon => pokemon.type.find( type => type.name === action.payload));
            return {
                ...state,
                pokemons:
                action.payload === "allTypes"
                ? [...state.allPokes]
                : allPokeTypeFiltered
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
    
        default:
            return { ...state };
    }
};

export default reducer;