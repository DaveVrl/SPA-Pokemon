const axios = require('axios');
const { Type } = require('../db');
const URL = "https://pokeapi.co/api/v2/type";

const getType = async () => {
    
        const { data } = await axios(URL);

        const { results } = data;

        const typeList = results.map((type) => {
            return { type: type.name };
        });

        await Type.bulkCreate(typeList);
};

module.exports = getType;