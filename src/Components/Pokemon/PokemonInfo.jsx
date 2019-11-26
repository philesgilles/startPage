import React from "react";
import "./PokemonInfo.css";
import ProgressBar from "../Main/ProgressBar";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

const PokeInfo = props => {
  const { pokemon } = props;

  const pokemonImg = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemon.id}.png?raw=true`;
  return (
    <div className="pokeInfo">
      <div className="pokeInfoHeader flex">
        <div>
          <h1>{pokemon.name}</h1>
        </div>
        <div>
          {pokemon.types.map(type => {
            const type2 = type.type.name;
            console.log(type);
            return (
              <span
                key={type2}
                className="badge"
                style={{
                  backgroundColor: `#${TYPE_COLORS[type2]}`,
                  color: "white"
                }}
              >
                {type2}
              </span>
            );
          })}
        </div>
      </div>
      <div className="pokeInfoContent flex">
        <div className="pokeImageWrapper">
          <img src={pokemonImg} alt="" />
        </div>
        <div className="pokeStatsWrapper">
          {pokemon.stats.map(stat => {
            console.log(stat);
            return (
              <div className="flex">
                <div>
                  {stat.stat.name} : {stat.base_stat}
                </div>
                <ProgressBar percentage={stat.base_stat} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeInfo;
