const axios = require('axios')
const chalk = require('chalk')

const CacheManager = require('./cacheManager')
const PokemonService = require('./pokemonService')
const Utils = require('./utils')

class PokemonController {
    constructor() {
        this.cacheManager = new CacheManager()
        this.pokemonService = new PokemonService()
    }

    queryPokemon = async query => {
        query = typeof query === 'string' ? query.toLowerCase() : query

        const cachedPokemon = this.cacheManager.searchPokemonCache(query)
    
        if (cachedPokemon) {
            if (CacheManager.hasPokemonEntryExpired(cachedPokemon.updatedTimestamp)) {
                this.cacheManager.removePokemonFromCache(query)
            } else {
                Utils.printPokemon(cachedPokemon)
                return cachedPokemon
            }
        }

        const pokemon = await this.pokemonService.getPokemonInformation(query)

        this.cacheManager.savePokemonToCache(pokemon)
    
        Utils.printPokemon(pokemon)

        return pokemon;
    }
}

module.exports = PokemonController