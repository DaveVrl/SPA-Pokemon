import { GET_POKES, GET_TYPES, GET_POKE_NAME, GET_POKE_ID, FILTER_ORDER, FILTER_TYPE, ORDER_BY_ATTACK, FILTER_ORIGIN, CREATE_POKE, GET_DB_POKES, CLEAR_POKEMON, CLEAR_DETAIL, SET_CURRENT_PAGE, SET_SHOW_CARD, LOADING , LOADING_ID} from "./action-types";

import axios from "axios";

export const setLoadingId = (value) => {
    return {
        type: LOADING_ID,
        payload: value
    }
};

export const setLoading = (value)=> {
    return {
        type: LOADING,
        payload : value
    }
};

export const getPokes = () => {
    // const endpoint = "http://localhost:3001/pokemons";
    const MAX_RETRIES = 10; // Número máximo de reintentos

    return async (dispatch) => {
        let retries = 0;

        while (retries < MAX_RETRIES) {
            try {
                const { data } = await axios.get("/pokemons");
                if (!data) throw new Error("No se obtuvo la data-pokemons");

                return dispatch({
                    type: GET_POKES,
                    payload: data
                });
            } catch (error) {
                console.error(`Error on attempt ${retries + 1}:`, error.message);
                retries++;
            }
        }

        // Si se superan los reintentos, manejar el error
        console.error('Max retries exceeded');
    };
};


export const getTypes = () => {
    // const endpoint = "http://localhost:3001/type";
    return async (dispatch) => {
        try {
            const { data } = await axios.get("/type");
            if(!data) throw new Error("No se obtuvo la data-type");

            return dispatch({
                type: GET_TYPES,
                payload: data
            })

        } catch (error) {
            console.error(error.message);
        }
    }
};

export const getPokeName = (name) => {
    // const endpoint = `http://localhost:3001/pokemons/name?name=${name}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/pokemons/name?name=${name}`);
            if(!data) throw new Error("No se obtuvo la data-name");
            
            return dispatch({
                type: GET_POKE_NAME,
                payload: data
            })

        } catch (error) {
            console.error(error.message);
        }
    }
};

export const getPokeId = (id) => {
    // const endpoint = `http://localhost:3001/pokemons/${id}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/pokemons/${id}`);
            if(!data) throw new Error("No se obtuvo la data-ID");
console.log(data)
            return dispatch({
                type: GET_POKE_ID,
                payload: data
            })
        } catch (error) {
            console.error(error.message)
        }
    }
};

export const filterOrder = (order) => {
    return {
        type: FILTER_ORDER,
        payload: order
    }
};

export const orderByAttack = (attack) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: attack
    }
};

export const filterType = (type) => {
    return {
        type: FILTER_TYPE,
        payload: type
    }
};

export const filterOrigin = (origin) => {
    return {
        type: FILTER_ORIGIN,
        payload: origin
    }
};

export const createPoke = (pokeData) => {
    return async (dispatch) => {
        
        // const endpoint = "http://localhost:3001/pokemons";
        
        try {
            const { data } = await axios.post("/pokemons", pokeData);
            
            if(!data) throw new Error("No se obtuvo la data");

            return dispatch({
                type: CREATE_POKE,
                payload: data
            })
        } catch (error) {
            console.error(error.message);
        }
    }
};

export const getDbPokes = () => {
    
    // const endpoint = "http://localhost:3001/db";

    return async (dispatch) => {
        try {
            const { data } = await axios("/db");

            return dispatch({
                type: GET_DB_POKES,
                payload: data
            })
        } catch (error) {
            console.error(error.message);
        }
    }
};

export const clearPokemon = () => { //name
    return {
        type: CLEAR_POKEMON,
        payload: {}
    }
};

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
        payload: {}
    }
};

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
};

export const setShowCard = (boolean) => {
    return {
        type: SET_SHOW_CARD,
        payload: boolean
    }
};