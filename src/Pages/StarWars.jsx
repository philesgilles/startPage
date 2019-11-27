import React from "react";
import "./StarWars.css";
const StarWars = () => {
  return (
    <React.Fragment>
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/img/starWarsLogo.jpg"}
          alt="Star Wars Logo"
          className="starWarsLogo"
        />
      </div>
    </React.Fragment>
  );
};

export default StarWars;
