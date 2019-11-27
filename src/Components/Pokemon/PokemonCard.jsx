import React, { useState } from "react";
import "./PokemonCard.css";
import styled from "styled-components";
import Loading from "../Loading/Loading";

const Sprite = styled.img`
  width: 70%;
  max-width: 130px;
  display: none;
  margin: 10px auto;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const PokeCard = props => {
  const { name, url } = props;
  const [imageLoading, setImageLoading] = useState(true);
  const [toManyRequests, setToManyRequests] = useState(false);
  const pokemonIndex = url.split("/")[url.split("/").length - 2];
  const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

  return (
    <Card className="pokeCard" onClick={props.handleClick}>
      <div className="pokeHeader">
        <h4>
          {pokemonIndex}. {name}
        </h4>
      </div>
      {imageLoading ? <Loading /> : null}
      <Sprite
        className=""
        src={imageUrl}
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
    </Card>
  );
};

export default PokeCard;
