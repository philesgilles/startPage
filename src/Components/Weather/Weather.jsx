import React, { useState, useEffect } from "react";

import "./Weather.css";
import Loading from "../Loading/Loading";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // fetch(
    //   "http://dataservice.accuweather.com/currentconditions/v1/27581?apikey=Unl7jIAxzReRkayK8SAxGJp9P7IjjXSA&details=true"
    // )
    fetch("/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(weatherData => {
        setIsLoading(false);
        setWeather(weatherData[0]);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  let printWeather = <Loading />;
  if (!isLoading && Object.keys(weather).length > 0) {
    console.log(weather);
    console.log(weather.RealFeelTemperature);
    printWeather = (
      <React.Fragment>
        <h4>Weather today in Brussels is {weather.WeatherText}</h4>
        <div className="weatherWidgetInfo">
          <div>
            <p>
              Temperature : {weather.Temperature.Metric.Value} °C (real feel:{" "}
              {weather.RealFeelTemperature.Metric.Value} °C )
            </p>
            <p>
              Wind : {weather.Wind.Speed.Metric.Value} km/h blowing{" "}
              {weather.Wind.Direction.Degrees}° (
              {weather.Wind.Direction.Localized})
            </p>
            <p>Pressure : {weather.Pressure.Metric.Value} mb</p>
          </div>
          <div>
            <p>Humidity : {Weather.RelativeHumidity} %</p>
            <p>Visibility : {weather.Visibility.Metric.Value} km</p>
            <p>Uv Index : {weather.UVIndexText}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <div className="weatherWidget">{printWeather}</div>;
};

export default Weather;
