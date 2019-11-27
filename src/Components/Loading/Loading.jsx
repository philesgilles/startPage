import React, { Component } from "react";

import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
}

export default Loading;
