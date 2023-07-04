const URL = "https://pokeapi.co/api/v2/pokemon/";
const axios = require("axios");

const getAllPokemons = async (req, res) => {
    try {

        const { data } = await axios(URL);

        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).json({error: error.message});

    }
};

module.exports = getAllPokemons;