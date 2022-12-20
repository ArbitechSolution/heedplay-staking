import React from "react";
import "./staked.css";
const Staked = ({ props }) => {
  return (
    <div className="container-fluid bg-dark staked-container pt-5">
      <div className="row box">
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            Total Staked
          </span>
          <span className="d-flex  staked-subheading">
            $ {props?.totalStake}
          </span>
        </div>
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">Directs</span>
          <span className="d-flex  staked-subheading">{props?.directs}</span>
        </div>
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            ROIReleased
          </span>
          <span className="d-flex  staked-subheading">
            {props?.roiReleased}
          </span>
        </div>

        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading">
            You Earned
          </span>
          <span className="d-flex  staked-subheading">
            $ {props?.totalEarned}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Staked;
