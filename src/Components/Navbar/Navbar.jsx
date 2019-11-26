import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink className="" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="" to="/star-wars">
            Star Wars
          </NavLink>
        </li>
        <li>
          <NavLink className="" to="/pokemon">
            Pokemon
          </NavLink>
        </li>
        <li>
          <NavLink className="" to="/nasa">
            Nasa
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
