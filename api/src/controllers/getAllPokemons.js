const URL = "https://pokeapi.co/api/v2/pokemon?limit=70&offset=0";
const axios = require("axios");

const getAllPokemons = async (req, res) => {
    try {

        const { data } = await axios(URL);

        const { results } = data;

        const mapResults = await Promise.all(results.map(async(el) => {
            let { url } = el;
    
            let { data } = await axios(url);

            let {id, name, height, weight} = data;

            let image = data.sprites.other.dream_world.front_default, 
            hp = data.stats[0].base_stat,
            attack = data.stats[1].base_stat,
            defense = data.stats[2].base_stat,
            speed = data.stats[5].base_stat;
            type = data.types.map(obj => {
                let { type } = obj;
                let { name } = type;
                return {name};
            });
            return {id, name, image, hp, attack, defense, speed, height, weight, type};
        }));

        //console.log(mapResults)

        return res.status(200).json(mapResults);

    } catch (error) {

        return res.status(500).json({error: error.message});

    }
};

module.exports = getAllPokemons;