const axios = require('axios');
const { Type } = require('../db');
const URL = "https://pokeapi.co/api/v2/type";

const getType = async (req , res) => {
    try {
        const { data } = await axios(URL);

        const { results } = data;

        const typeList = results.map((type) => {
            return { type: type.name };
        });

        const types = await Type.bulkCreate(typeList);

        return res.status(200).json(types);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
};

module.exports = getType;