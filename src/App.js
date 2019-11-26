import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

//Components
import Header from "./Components/Main/Header";
import Navbar from "./Components/Navbar/Navbar";

//Pages
import HomePage from "./Pages/HomePage";
import StarWars from "./Pages/StarWars";
import Pokemon from "./Pages/Pokemon";
import Nasa from "./Pages/Nasa";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={HomePage} />
        <Route path="/star-wars" component={StarWars} />>
        <Route path="/pokemon" component={Pokemon} />
        <Route path="/nasa" component={Nasa} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
