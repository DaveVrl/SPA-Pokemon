import { GET_POKES , GET_TYPES } from "./action-types";
import axios from "axios";

export const getPokes = (pokemons) => {
    const endpoint = "http://localhost:3001/pokemons";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint, pokemons);
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

export const getTypes = (types) => {
    const endpoint = "http://localhost:3001/type";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint, types);
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