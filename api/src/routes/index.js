const { Router } = require('express');
const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonById = require('../controllers/getPokemonById');
const postPokemon = require('../controllers/postPokemon');
const getPokemonByName = require('../controllers/getPokemonByName');
const getAllDbPokes = require('../controllers/getAllDbPokes');
const getType = require('../controllers/getType');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/types" , getType);

router.get("/pokemons" , getAllPokemons);

router.get("/db" , getAllDbPokes);

router.get("/pokemons/name", getPokemonByName);

router.get("/pokemons/:id" , getPokemonById);

router.post("/pokemons" , postPokemon);





module.exports = router;
