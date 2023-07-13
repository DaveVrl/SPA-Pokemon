const { Pokemon , Type } = require("../db");
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Op } = require("sequelize");

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


        const typeDB = await Type.findAll({
            where: {
                type: { [Op.in]: type }
              }
        });

        console.log(typeDB);//puedo ver los type en la db
        console.log(type)//veo los type que me llegan en ["",""]

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


        await Promise.all(
            typeDB.map(async (type) => {
              await newPoke.addType(type);
            })
          );
        
        console.log(newPoke)//se crea pero no tiene los type
        return res.status(200).json(newPoke);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = postPokemon;
