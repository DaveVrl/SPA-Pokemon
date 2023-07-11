import { GET_POKES , GET_TYPES, GET_POKE_NAME, GET_POKE_ID, FILTER_ORDER, FILTER_TYPE, ORDER_BY_ATTACK} from "./action-types";

const initialState = {
    pokemons: [],
    types: [],
    pokemon: [],
    id: [],
    allPokes: []
}

const reducer = (state = initialState , action) => {
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
            const allPokemonsCopy = [ ...state.pokemons]
            return {
                ...state,
                pokemons:
                action.payload === "A"
                ? allPokemonsCopy.sort((a,b) => a.name.localeCompare(b.name))
                : allPokemonsCopy.sort((a,b) => b.name.localeCompare(a.name)) 
            };

        case ORDER_BY_ATTACK:
            const allPokeCopy = [...state.pokemons]
            return {
                ...state,
                pokemons:
                action.payload === "A"
                ? allPokeCopy.sort((a,b) => a.attack - b.attack)
                : allPokeCopy.sort((a,b) => b.attack - a.attack)
            }

        case FILTER_TYPE:
            const allPokemonsFiltered = state.allPokes.filter(pokemon => pokemon.type.find( type => type.name === action.payload));
            return {
                ...state,
                pokemons:
                action.payload === "allTypes"
                ? [...state.allPokes]
                : allPokemonsFiltered
            };
    
        default:
            return { ...state };
    }
};

export default reducer;