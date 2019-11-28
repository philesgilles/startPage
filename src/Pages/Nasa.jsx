import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Loading from "../Components/Loading/Loading";
import styled from "styled-components";

import "./Nasa.css";
import "react-datepicker/dist/react-datepicker.css";

const Sprite = styled.img`
  width: 100%;
  display: none;
`;

const Nasa = () => {
  // Declare Hooks States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pictureInfo, setPictureInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const getPicture = date => {
    setIsLoading(true);
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=DEMO_KEY`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(pictureData => {
        console.log(pictureData);
        setPictureInfo(pictureData);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  useEffect(() => {
    setIsLoading(true);
    setImageLoading(true);
    let date = formatDate(selectedDate);
    getPicture(date);
  }, [selectedDate]);
  const pictureUrl = pictureInfo.url;
  return (
    <React.Fragment>
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/img/nasaLogo.png"}
          alt="Nasa Logo"
          className="nasaLogo"
        />
      </div>
      <div className="nasaHeader">
        <h3>Nasa - Picture of the days</h3>
      </div>
      <div className="nasaSelect flex">
        <div className="flex">
          <p>Select a date to get the picture :</p>
          <DatePicker
            maxDate={new Date()}
            minDate={new Date("1996-06-01")}
            showDisabledMonthNavigation
            yearDropdownItemNumber={23}
            showYearDropdown
            style={{ width: "30px" }}
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
          />{" "}
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="nasaContent">
          <div className="nasaPicture">
            {imageLoading ? <Loading /> : null}
            <Sprite
              className=""
              src={pictureUrl}
              onLoad={() => setImageLoading(false)}
              style={imageLoading ? null : { display: "block" }}
            />
          </div>
          <div className="nasaContentDescription">
            <p>
              <b>Title: </b>
              {pictureInfo.title}
            </p>
            <p>
              <b>Description: </b>
              {pictureInfo.explanation}
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Nasa;
