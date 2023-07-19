import { GET_POKES, GET_TYPES, GET_POKE_NAME, GET_POKE_ID, FILTER_ORDER, FILTER_TYPE, ORDER_BY_ATTACK, FILTER_ORIGIN, CREATE_POKE, GET_DB_POKES, CLEAR_POKEMON, CLEAR_DETAIL, SET_CURRENT_PAGE, SET_SHOW_CARD } from "./action-types";

import axios from "axios";

export const getPokes = () => {
    const endpoint = "http://localhost:3001/pokemons";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(!data) throw new Error("No se obtuvo la data-pokemons");

            return dispatch({
                type:GET_POKES,
                payload: data
            })
        } catch (error) {
            console.error(error.message);
        }
    }
};

export const getTypes = () => {
    const endpoint = "http://localhost:3001/type";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
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
    const endpoint = `http://localhost:3001/pokemons/name?name=${name}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
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
    const endpoint = `http://localhost:3001/pokemons/${id}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(!data) throw new Error("No se obtuvo la data-ID");

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
        
        const endpoint = "http://localhost:3001/pokemons";
        
        try {
            const { data } = await axios.post(endpoint, pokeData);
            
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
    
    const endpoint = "http://localhost:3001/db";

    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint);

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