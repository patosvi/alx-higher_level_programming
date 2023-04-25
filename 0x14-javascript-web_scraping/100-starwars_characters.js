#!/usr/bin/node
const request = require('request');

async function getCharacterName(url) {
  try {
    const response = await request(url);
    const body = JSON.parse(response.body);
    return body.name;
  } catch (error) {
    console.error(`Error getting character name from ${url}: ${error}`);
    return null;
  }
}

async function main() {
  try {
    const filmId = process.argv[2];
    const filmUrl = `http://swapi.co/api/films/${filmId}`;
    const response = await request(filmUrl);
    const film = JSON.parse(response.body);
    const characterUrls = film.characters;
    const characterNames = await Promise.all(
      characterUrls.map(url => getCharacterName(url))
    );
    console.log(characterNames.filter(name => name !== null));
  } catch (error) {
    console.error(`Error getting characters from film ID ${process.argv[2]}: ${error}`);
  }
}

main();

