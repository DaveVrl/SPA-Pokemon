import { GET_POKES , GET_TYPES, GET_POKE_NAME, GET_POKE_ID } from "./action-types";

const initialState = {
    pokemons: [],
    types: [],
    pokemon: [],
    id: []
}

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case GET_POKES:
            return {
                ...state,
                pokemons: action.payload
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
            }
        
        case GET_POKE_ID:
            return {
                ...state,
                id: action.payload
            }

    
        default:
            return { ...state };
    }

}

export default reducer;