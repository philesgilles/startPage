import React from "react";

import "./Backdrop.css";

const backdrop = props => (
  <div onClick={props.handleClick} className="backdrop"></div>
);

export default backdrop;
