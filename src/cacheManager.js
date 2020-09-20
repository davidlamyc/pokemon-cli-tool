const fs = require('fs')

class CacheManager {
    loadAllPokemonFromCache = () => {
        try {
            const dataBuffer = fs.readFileSync('./pokemon.txt')
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
        } catch (e) {
            return []
        }
    }
    
    searchPokemonCache = (query) => {
        const pokemon = this.loadAllPokemonFromCache()
        return pokemon.find(p => p.name === query || p.id === query)
    }
    
    removePokemonFromCache = (query) => {
        const pokemon = this.loadAllPokemonFromCache()
        const filteredPokemon = pokemon.filter(p => p.name !== query && p.id !== query)
        const dataJSON = JSON.stringify(filteredPokemon)
        fs.writeFileSync('./pokemon.txt', dataJSON)
    }
    
    savePokemonToCache = (pokemon) => {
        const currentPokemonArray = this.loadAllPokemonFromCache()
        const newPokemonArray = [...currentPokemonArray, pokemon]
        const dataJSON = JSON.stringify(newPokemonArray)
        fs.writeFileSync('./pokemon.txt', dataJSON)
    }

    static hasPokemonEntryExpired = (cachedPokemonUpdateTimeStamp) => {
        const secondsSinceLastRetrievedPokemon = (new Date() - new Date(cachedPokemonUpdateTimeStamp)) / 1000
        const secondsInAWeek = 86400 * 7
        return secondsSinceLastRetrievedPokemon > secondsInAWeek
    }
}

module.exports = CacheManager