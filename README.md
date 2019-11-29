# Start Page

[Preview here](http://163.172.82.216:3333/).

I've done this project in Novembre 2019. This is a NodeJS application (made with react) to consume 4 API's (Star Wars, Nasa, Pokemon and accuweather) and a To-do list.
For this project, I haven't used any CSS framework (back to the roots). And I've used mainly grid and flex displays (best for responsive).
I have chosen a flat design with distinctive theme on every page.
All requests are handled showing a loading component.

## technologies used

- React
- REST API
- GraphQL (Star Wars API)
- lodash
- react-datepicker
- react-dom
- react-router-dom
- react-select
- styled-components

### Home Page

Weather widget API showing the weather in brussels.
To Do widget to add/edit/remove to do's.

To-Do list

### Pokemon API

Pokedex retriving the information from https://pokeapi.co 
For performance savings, the page show 20 pokemons at a time.
Clicking on a Pokemon will show a modal with the pokemon's informations and stats.
There are badges on the top right showing the type of pokemon and changing colors deponding on the type.
Stats level bar change progressively color depending on level (green low => red high).
There is a search bar to quickly find a pokemon.

### Nasa API

This page retrives the *Picture of the day* from Nasa API.
You can then select a date to get the pic of that day.

### StarWars API

This page digest the **GraphQL** StarWars API. https://graphiql.graphcms.com/simple/v1/swapi
It retrives the informations of all the Star Wars planets and show it to the user.
The Element have a **canvas** moving stars space looking background.
You can select previous and next planet to get the informations.
