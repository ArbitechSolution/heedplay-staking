import React from "react";
import "./staked.css";
const Staked = () => {
  return (
    <div className="container-fluid bg-dark staked-container">
      <div className="row box">
        <div className="col-12 col-lg-4 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Total Staked
          </span>
          <span className="d-flex  staked-subheading">$ 18.63</span>
        </div>
        <div className="col-12 col-lg-4 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Daily Output
          </span>
          <span className="d-flex  staked-subheading">576,000 SR</span>
        </div>
        <div className="col-12 col-lg-4 staked-column">
          <span className="d-flex text-captilize staked-heading">
            You Earned
          </span>
          <span className="d-flex  staked-subheading">$ 0.00</span>
        </div>
      </div>
    </div>
  );
};
export default Staked;
