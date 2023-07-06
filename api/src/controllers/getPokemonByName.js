const { Pokemon } = require("../db");
const { Op } = require("sequelize");
const URL = "https://pokeapi.co/api/v2/pokemon";
const axios = require("axios");

const getPokemonByName = async (req , res) => {
    try {

        let allPokemons = [];

        const { name } = req.query;

        if(!name) return res.status(404).send("Debe ingresar un nombre");
        
        //DB
        const foundDB = await Pokemon.findAll({
            where:{ name:{
                [Op.iLike]: `%${name}%`}
            }
        });
        
        //API
        let nameLow = name.toLowerCase();

        try {

         const data = await axios(`${URL}/${nameLow}`);

         //console.log(data.data.name); //Compruebo como me trae la data

         let info = data.data; //Guardo la data en una variable para acceder por .

         if (info.name.toLowerCase() === nameLow) {

            let {id, name, height, weight} = info;

        //console.log(info); //Compruebo que tengo la data que requiero

            let image = info.sprites.other.dream_world.front_default, 
            hp = info.stats[0].base_stat,
            attack = info.stats[1].base_stat,
            defense = info.stats[2].base_stat,
            speed = info.stats[5].base_stat;
            type = info.types.map(obj => {
                let { type } = obj;
                let { name } = type;
                return {name};
            });
            
            let poke = {id, name, image, hp, attack, defense, speed, height, weight, type};

            allPokemons.push(poke);
        };
         
        } catch (error) {
         console.error("No se encuentra NAME en la petición a la API, continua el código");
        };
        
        allPokemons.push(...foundDB);

        if(allPokemons.length === 0) return res.status(404).send(`No existe el Pokemon "${name}"`);

        return res.status(200).json(allPokemons);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = getPokemonByName;