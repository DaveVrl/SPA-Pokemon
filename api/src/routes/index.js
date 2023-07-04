const { Router } = require('express');
const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonById = require('../controllers/getPokemonById');
const postPokemon = require('../controllers/postPokemon');
const getPokemonByName = require('../controllers/getPokemonByName')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons" , getAllPokemons);

router.get("/pokemons/name", getPokemonByName);

router.get("/pokemons/:id" , getPokemonById);

router.post("/pokemons" , postPokemon);



module.exports = router;
