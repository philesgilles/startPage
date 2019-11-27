import React, { useState, useEffect } from "react";
import "./PokemonInfo.css";
import ProgressBar from "../Main/ProgressBar";
import styled from "styled-components";
import Loading from "../Loading/Loading";

const Sprite = styled.img`
  height: 130px;
  display: none;
  margin: 10px auto;
`;

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
  const [species, setSpecies] = useState({});
  const [description, setDescription] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [toManyRequests, setToManyRequests] = useState(false);
  //Pokemon Abilities
  const abilities = pokemon.abilities
    .map(ability => {
      return ability.ability.name
        .toLowerCase()
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    })
    .join(", ");

  //Get Pokemon Image
  const pokemonImg = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemon.id}.png?raw=true`;

  const fetchSpecies = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
      .then(response => {
        if (!response.ok) {
          return {};
        }
        return response.json();
      })
      .then(speciesData => {
        setSpecies(speciesData);
        // set description and keep only english text
        if (speciesData.flavor_text_entries) {
          speciesData.flavor_text_entries.some(flavor => {
            if (flavor.language.name === "en") {
              setDescription(flavor.flavor_text);
              return "";
            }
            return "";
          });
        }
      });
  };

  useEffect(() => {
    fetchSpecies();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pokeInfo">
      <div className="pokeInfoHeader flex">
        <div>
          <h1>{pokemon.name}</h1>
        </div>
        <div>
          {pokemon.types.map(type => {
            const type2 = type.type.name;
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
          <img
            onClick={props.handleClick}
            className="pokeImageWrapperImg"
            src={process.env.PUBLIC_URL + "/img/closeIcon.png"}
            alt="close"
          />
        </div>
      </div>
      <div className="pokeInfoContent">
        <div className="pokeImageWrapper">
          {imageLoading ? <Loading /> : null}
          <Sprite
            className=""
            src={pokemonImg}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setToManyRequests(true);
              setImageLoading(false);
            }}
            style={
              toManyRequests
                ? { display: "none" }
                : imageLoading
                ? null
                : { display: "block" }
            }
          />
          {toManyRequests ? (
            <p className="mx-auto">
              <span className="badge badge-danger mt-2">
                To Many Requests. Retry later !
              </span>
            </p>
          ) : null}
        </div>
        <div className="pokeStatsWrapper">
          {pokemon.stats.map(stat => {
            return (
              <React.Fragment key={stat.stat.name}>
                <div className="pokeStatsText">
                  {stat.stat.name} : {stat.base_stat}
                </div>
                <ProgressBar percentage={stat.base_stat / 1.8} />
              </React.Fragment>
            );
          })}
        </div>
        {Object.keys(species).length > 0 ? (
          <React.Fragment>
            <div className="pokeStatDescription">
              <p>{description}</p>
              <hr />
            </div>
            <div className="pokeProfile">
              <h3>Profile</h3>
              <div className="pokeProfileText">
                <p className="textRight">
                  <b>Height :</b>
                </p>
                <p>{pokemon.height}0 cm</p>
                <p className="textRight">
                  <b>Weight :</b>
                </p>
                <p>{pokemon.weight / 10} kg</p>
                <p className="textRight">
                  <b>Catch rate :</b>
                </p>
                <p>{Math.round((100 / 255) * species.capture_rate)} %</p>
                <p className="textRight">
                  <b>Gender Ratio :</b>
                </p>
                <div>
                  <div style={{ marginTop: "10px" }}>
                    <ProgressBar percentage={species.gender_rate * 12.5} />
                  </div>
                  <p
                    className="onTop"
                    style={{
                      textAlign: "center",
                      position: "relative",
                      top: "-31px"
                    }}
                  >
                    {species.gender_rate * 12.5} % females
                  </p>
                </div>
              </div>
              <div className="pokeProfileText">
                <p className="textRight">
                  <b>Eggs groups :</b>
                </p>
                <p>
                  {species.egg_groups
                    .map(group => {
                      return group.name
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ");
                    })
                    .join(", ")}
                </p>
                <p className="textRight">
                  <b>Hatch steps :</b>
                </p>
                <p>{255 * (species["hatch_counter"] + 1)}</p>
                <p className="textRight">
                  <b>Abilities :</b>
                </p>
                <p>{abilities}</p>
                <p className="textRight">
                  <b>EVs :</b>
                </p>
                <p>
                  {pokemon.stats
                    .filter(stat => {
                      if (stat.effort > 0) {
                        return true;
                      }
                      return false;
                    })
                    .map(stat => {
                      return `${stat.effort} ${stat.stat.name
                        .toLowerCase()
                        .split("-")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}`;
                    })
                    .join(", ")}
                </p>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PokeInfo;
