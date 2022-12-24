import React from "react";
import "./staking.css";
const Staking = () => {
  return (
    <div className="container-fluid bgStaking-image ">
      <div className="row ">
        <span className="d-flex text-captilize text-heading">Staking</span>
      </div>
      <div className="row ">
        <span className="d-flex text-para">
          Sacred Farms offer multiple farming opportunities to you. Get double
          rewards by staking your HPG tokens in return for additional SR tokens
          and earning high income.
        </span>
      </div>
      <div className="row">
        <a href="#" className=" d-flex text-link">
          Learn how to start
        </a>
      </div>
    </div>
  );
};
export default Staking;
