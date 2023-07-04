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
        console.log(foundDB);
        const { data } = await axios(`${URL}/${name}`);
        
        if(data.name.toLowerCase().includes(name.toLowerCase())) {
            allPokemons.push(data);
        }

        allPokemons.push(...foundDB);

        // const pokemon = {
        //     id: data.id,
        //     name: data.name,
        //     hp: data.stats[0].base_stat,
        //     attack: data.stats[1].base_stat,
        //     defense: data.stats[2].base_stat,
        //     speed: data.stats[5].base_stat,
        //     height: data.height,
        //     weight: data.weight
        // }

        return res.status(200).json(allPokemons);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = getPokemonByName;