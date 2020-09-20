#!/usr/bin/env node

const { argv } = require('yargs')
const PokemonController = require('./src/pokemonController')

const pokemonController = new PokemonController()
pokemonController.queryPokemon(argv.query)
