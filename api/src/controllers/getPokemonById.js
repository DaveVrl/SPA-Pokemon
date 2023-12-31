const URL = "https://pokeapi.co/api/v2/pokemon";
const axios = require("axios");
const { Pokemon , Type } = require('../db.js');

const getPokemonById = async (req , res) => {
    try {
        const { id } = req.params;

        if(isNaN(id)) {
            const foundDB = await Pokemon.findByPk(id,{include:Type, distinct: true})
            
            if(foundDB) return res.status(200).json(foundDB);

            return res.status(400).send("ID Not Found");
        }

        //if(id > 60) throw new Error("El ID debe ser menor a 50")

        const { data } = await axios(`${URL}/${id}`);
    
        const pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            type: data.types.map(obj => {
                let { type } = obj;
                let { name } = type;
                return {name};
            })
        }

        return res.status(200).json(pokemon);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
};


module.exports = getPokemonById;
