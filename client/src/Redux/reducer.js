import { GET_POKES , GET_TYPES} from "./action-types";

const initialState = {
    pokemons: [],
    types: []
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
            }

    
        default:
            return { ...state };
    }

}

export default reducer;