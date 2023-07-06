const { Pokemon , Type } = require("../db");

const postPokemon = async (req , res) => {
    try {
        const{ id , name , image , hp , attack , defense , speed , height , weight , type} = req.body;

        if(!name || !image || !hp || !attack || !defense) return res.status(401).send("Faltan datos");
        
//Ver como validar por may o min
        const pokemonExists = await Pokemon.findOne({
            where:{
                name:name
            }
        });

        if(pokemonExists) throw new Error(`El Pokemon ${name} ya existe.`);

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
