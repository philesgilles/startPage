import React from "react";
import "./ProgressBar.css";

const ProgressBar = props => {
  let { percentage } = props;
  if (percentage > 100) {
    percentage = 100;
  }
  return (
    <div className="progress-bar">
      <Filler percentage={percentage} />
    </div>
  );
};

const Filler = props => {
  let { percentage } = props;
  if (percentage > 100) {
    percentage = 100;
  }
    return <div className="filler" style={{ width: `${percentage}%`, background: `rgb(${percentage*2.55+75},${(125 - percentage)*2.55},0)` }} />;
};

export default ProgressBar;
