const URL = "https://pokeapi.co/api/v2/pokemon/";
const axios = require("axios");
const { Pokemon } = require('../db.js');

const getPokemonById = async (req , res) => {
    try {
        const { id } = req.params;

        const { data } = await axios(`${URL}/${id}`);
    
        const pokemon = {
            id: data.id,
            name: data.name
        }

        return res.status(200).json(pokemon);

    } catch (error) {
        
    }
};


module.exports = getPokemonById;
