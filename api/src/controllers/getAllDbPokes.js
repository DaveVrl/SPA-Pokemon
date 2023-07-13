const { Pokemon , Type } = require("../db");

const getAllDbPokes = async (req , res) => {
    try {
        const poke = await Pokemon.findAll({where:{db:true}, include:[{model:Type}]});

        const arrayPoke = [...poke];

        if(arrayPoke) return res.status(200).json(arrayPoke);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getAllDbPokes;