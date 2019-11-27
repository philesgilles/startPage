import React from "react";
import "./StarWars.css";
const StarWars = () => {
  return (
    <React.Fragment>
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/img/starWarsLogo.png"}
          alt="Star Wars Logo"
          className="starWarsLogo"
        />
      </div>
      <div className="swHeader">
        <h3>Star Wars API</h3>
      </div>
      <div className="swContent">Some Bullshit</div>
    </React.Fragment>
  );
};

export default StarWars;
