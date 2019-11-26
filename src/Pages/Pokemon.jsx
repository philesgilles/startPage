import React, { useState, useEffect } from "react";
import Loading from "../Components/Loading/Loading";
import PokeCard from "../Components/Pokemon/PokemonCard";
import PokeInfo from "../Components/Pokemon/PokemonInfo";

//import PokeList from "../Components/Pokemon/PokemonList";
import "./Pokemon.css";

const Pokemon = () => {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const fetchPokemon = url => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(pokemonsData => {
        // pokemonsData.results.forEach(pokemonData => {
        //   newPokeList.push(pokemonData);
        // });
        setPokeList(pokemonsData.results);
        setNextPage(pokemonsData.next);
        setPreviousPage(pokemonsData.previous);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const selectPokemon = pokemonUrl => {
    console.log(pokemonUrl);
    // fetch(url)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch.");
    //     }
    //     return response.json();
    //   })
    //   .then(pokemonData => {
    //     //
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    setIsLoading(true);
    //Fetch all pokemons
    fetchPokemon("https://pokeapi.co/api/v2/pokemon/");
  }, []);

  let showPokemons = <Loading />;
  if (!isLoading && pokeList.length > 0) {
    showPokemons = pokeList.map(pokemon => {
      return (
        <PokeCard
          handleClick={console.log(pokemon.name)}
          key={pokemon.name}
          name={pokemon.name}
          url={pokemon.url}
        />
      );
    });
  }

  let pokeControl = (
    <div className="pokeControl">
      {previousPage ? (
        <span onClick={e => fetchPokemon(previousPage)}>{"<< Previous"}</span>
      ) : (
        <span> </span>
      )}
      {nextPage ? (
        <span onClick={e => fetchPokemon(nextPage)}>{"Next >>"}</span>
      ) : (
        <span> </span>
      )}
    </div>
  );

  return (
    <div className="pokemon">
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/img/pokeball.png"}
          alt="pokeball"
          className="pokeballImg"
        />
      </div>
      <div className="pokeHeader">
        <h3>Pokedex</h3>
      </div>
      {pokeControl}
      <div className="allPokeCards">{showPokemons}</div>
      {pokeControl}
      <PokeInfo pokemon={selectedPokemon} />
    </div>
  );
};

export default Pokemon;