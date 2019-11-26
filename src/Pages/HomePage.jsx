import React from "react";
import Weather from "../Components/Weather/Weather";
import ToDoList from "../Components/ToDoList/ToDoList";

const HomePage = () => {
  return (
    <React.Fragment>
      <Weather />
      <ToDoList />
    </React.Fragment>
  );
};

export default HomePage;
