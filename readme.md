Pokemon CLI Tool
====================

## Installation

1. Install [NodeJS (Version 12)](https://nodejs.org/en/)
2. Check that your NodeJS installation is successful by running `node -v`. You should see the output of your NodeJS version. i.e. `v12.16.2`
3. In this directory inside your terminal, run `npm install`

Now you are ready to use the Pokemon CLI Tool!

## How to use
<br/>

><h3 style='color: orange; text-align: center'>Ensure you are in THIS directory when running commands!</h3>
<br/>

Run the following command inside your terminal, where you may replace the `--query` perimeter with either a pokemon's name (i.e. `--query="charmander"`) or a pokemon's ID (i.e. `--query=4`)

```
./pokecli.js --query="bulbasaur"
```

See your pokemon's information!

```
#1 BULBASAUR


Type(s) grass, poison


Kanto encounter(s)
Location: cerulean-city | Method: gift
Location: pallet-town | Method: gift


Stats
hp: 45
attack: 49
defense: 49
special-attack: 65
special-defense: 65
speed: 45
```
