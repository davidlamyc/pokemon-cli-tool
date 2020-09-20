const chalk = require('chalk');

class Utils {
    static printPokemon = (pokemon) => {
        const { id, name, types, kantoEncounters, stats} = pokemon;
        console.log(chalk.inverse.blue.bold(`#${id} ${name.toUpperCase()}`))
        console.log('\n')
        console.log(chalk.inverse('Type(s)') + ' ' +  types.join(', '))
        console.log('\n')
        console.log(chalk.inverse('Kanto encounter(s)'))
        if (kantoEncounters.length <= 0) {
            console.log('-')
        } else {
            kantoEncounters.forEach(e => {
                console.log(`Location: ${e.location} | Method: ${e.method}`)
            })
        }
        console.log('\n')
        console.log(chalk.inverse('Stats'))
        stats.forEach((s, i) => {
            console.log(`${s.name}: ${s.value}`)
        })
        console.log('\n')
    }
}

module.exports = Utils