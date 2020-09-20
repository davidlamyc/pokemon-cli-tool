const axios = require('axios')
const chalk = require('chalk')

class PokemonService {
    getPokemonInformation = async query => {
        try {
            const { data: pokemonRawData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
            const pokemon = {
                id: pokemonRawData.id,
                name: pokemonRawData.name,
                types: [],
                stats: []
            }
            pokemonRawData.types.forEach(typeObj => {
                pokemon.types.push(typeObj.type.name)
            })
            pokemonRawData.stats.forEach(statObj => {
                pokemon.stats.push({
                    name: statObj.stat.name,
                    value: statObj.base_stat
                })
            })
        
            if (pokemonRawData) {
                try {
                    pokemon.kantoEncounters = await this.getEncounterLocationsAndMethodsinKanto(query)
                } catch (err) {
                    throw new Error(chalk.inverse('Please enter a valid query'))
                }
                
            }
        
            pokemon.updatedTimestamp = new Date()
            return pokemon
        } catch (error) {
            throw new Error(chalk.inverse('Please enter a valid query'))
        }
    }

    getEncounterLocationsAndMethodsinKanto = async query => {
        try {
            // Get encounters
            // encounters API provide the location area of the encounter, and encounter method
            const { data: encounters } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}/encounters`)
            // for each location area, get the encounter method
            // NOTE: each encounter has a 'version_details' array containing 'encounter details',
            // but every 'encounter detail' contains the same method name
            encounters.forEach(e => e.method = e.version_details[0].encounter_details[0].method.name)
    
            let locationAreas = await Promise.all(
                encounters.map(async ({ location_area }, i) => {
                    const { data: retrievedLocationArea } = await axios.get(location_area.url)
                    // get the location for each encounter, and add to 'encounter' object
                    encounters[i].location = retrievedLocationArea.location.name
                    return retrievedLocationArea
                })
            )
            
            let locations = await Promise.all(
                locationAreas.map(async ({ location }, i) => {
                    const { data: retrievedLocation } = await axios.get(location.url)
                    // get the location for each encounter, and add to 'encounter' object
                    encounters[i].region = retrievedLocation.region.name
                    return retrievedLocation
                })
            )
    
            return encounters
            .filter(e => e.region === 'kanto')
            .map(({ method, location }) => { return { method, location } })
        } catch (error) {
            throw new Error(chalk.inverse('Please enter a valid query'))
        }
    }
}

module.exports = PokemonService