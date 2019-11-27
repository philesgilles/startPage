import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import "./SearchPoke.css";

const SearchBar = props => {
  const [allPoke, setAllPoke] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const fetchAllPokemons = url => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(pokemonsData => {
        let pokemons = allPoke;
        pokemonsData.results.map(pokemon => {
          pokemons.push({ value: pokemon.url, label: pokemon.name });
        });
        pokemons = _.orderBy(pokemons, ["label"], ["asc"]);
        setAllPoke(pokemons);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAllPokemons("https://pokeapi.co/api/v2/pokemon/?limit=964");
  }, []);
  return (
    <div className="searchPoke">
      <Select
        options={allPoke}
        placeholder={allPoke.length > 0 ? "Search" : "Loading Pokemons"}
        onChange={e => props.handleSelect(e)}
      />
    </div>
  );
};

export default SearchBar;
