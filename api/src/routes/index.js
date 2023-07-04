const { Router } = require('express');
const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonById = require('../controllers/getPokemonById');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons" , getAllPokemons);
router.get("/pokemons/:id" , getPokemonById);


module.exports = router;
