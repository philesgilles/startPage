import React, { useEffect, useState } from "react";
import Select from "react-select";

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
        //console.log(pokemonsData);
        setAllPoke(pokemonsData.results);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  console.log(allPoke);

  useEffect(() => {
    console.log("fetching pokemons");
    fetchAllPokemons("https://pokeapi.co/api/v2/pokemon/?limit=964");
  }, []);
  const options = [];
  return (
    <div className="searchPoke">
      <Select />
    </div>
  );
};

export default SearchBar;
