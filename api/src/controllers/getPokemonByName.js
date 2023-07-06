const { Pokemon } = require("../db");
const { Op } = require("sequelize");
const URL = "https://pokeapi.co/api/v2/pokemon";
const axios = require("axios");

const getPokemonByName = async (req , res) => {
    try {

        let allPokemons = [];

        const { name } = req.query;

        if(!name) return res.status(404).send("Debe ingresar un nombre");
        
        const foundDB = await Pokemon.findAll({
            where:{ name:{
                [Op.iLike]: `%${name}%`}
            }
        });
        
        const { data } = await axios(`${URL}/${name}`);
        
        if(data.name.toLowerCase().includes(name.toLowerCase())) {

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

            let poke = {id, name, image, hp, attack, defense, speed, height, weight, type};

            allPokemons.push(poke);
        };

        allPokemons.push(...foundDB);

        return res.status(200).json(allPokemons);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = getPokemonByName;