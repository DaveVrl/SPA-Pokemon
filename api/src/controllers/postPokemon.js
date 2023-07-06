const { Pokemon , Type } = require("../db");
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

const postPokemon = async (req , res) => {
    try {
        const{ id , name , image , hp , attack , defense , speed , height , weight , type} = req.body;

        if(!name || !image || !hp || !attack || !defense) return res.status(401).send("Faltan datos");

        let nameLow = name.toLowerCase();

        //Validación API

        let dataExists = false;

        try {

        const response = await axios(`${URL}/${nameLow}`);
        const data = response.data;

        if (data && data.name) dataExists = true;

        } catch (error) {
            console.error("No se encuentra NAME en la petición a la API, continua el código");
        }

        if(dataExists) throw new Error(`El Pokemon ${name} ya existe`);

        

        //Validación DB
        const pokemonExists = await Pokemon.findOne({
            where:{
                name:nameLow
            }
        });
        
        if(pokemonExists) throw new Error(`El Pokemon ${name} ya existe.`);


        //Pasa validaciónes => Se crea
        const newPoke = await Pokemon.create({
                name:name,
                image:image,
                hp:hp,
                attack:attack,
                defense:defense,
                speed:speed,
                height:height,
                weight:weight
        });

        const typeDB = await Type.findAll({
            where: {type:type}
        });

        newPoke.setTypes(typeDB);

        return res.status(200).json(newPoke);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = postPokemon;
