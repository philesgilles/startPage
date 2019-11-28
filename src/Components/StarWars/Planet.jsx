import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

import "./Planet.css";
const Planet = props => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //Fetch All Planets GraphQL
  const fetchPlanets = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
            allPlanets {
                name
                population
                climate
                diameter
                surfaceWater
                terrain
                residents {
                name
                }
            }
        }`
    };

    fetch("https://api.graphcms.com/simple/v1/swapi", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed !");
        }
        return res.json();
      })
      .then(resData => {
        setPlanets(resData.data.allPlanets);
        setIsLoading(false);
        let random = Math.floor(Math.random() * planets.length);
        setSelectedPlanet(random);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const prevPlanet = () => {
    let len = planets.length;
    let newSelected = selectedPlanet;
    if (selectedPlanet === 0) {
      newSelected = len - 1;
    } else {
      newSelected--;
    }
    setSelectedPlanet(newSelected);
  };
  const nextPlanet = () => {
    let len = planets.length - 1;
    let newSelected = selectedPlanet + 1;
    if (newSelected > len) {
      newSelected = 0;
    }
    setSelectedPlanet(newSelected);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  let planet = planets[selectedPlanet];
  console.log(planet);

  let planetInfo = <Loading />;

  if (selectedPlanet !== null) {
    console.log("not null");
    planetInfo = (
      <React.Fragment>
        <div className="planetSelect flex">
          <div onClick={prevPlanet}>{"<<"}</div>
          <div>{planet.name}</div>
          <div onClick={nextPlanet}>{">>"}</div>
        </div>
        <div className="swPlanetInfo flex">
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <div className="swPlanet">{planetInfo}</div>;
};

export default Planet;
