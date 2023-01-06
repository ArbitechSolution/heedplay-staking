import React from "react";
import "./levelDetail.css";
function LevelPlace({ userCount, totalRoi }) {
  return (
    <div className="container-fluid staked-container ">
      <div className="row  d-flex justify-content-between boxLevel mb-5">
        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading sub">
            Total User
          </span>
          <span className="d-flex  staked-subheading">{userCount}</span>
        </div>

        <div className="col-sm-12 col-lg-3 staked-column">
          <span className="d-flex text-captilize staked-heading sub">
            Affiliate Reward
          </span>
          <span className="d-flex  staked-subheading">{totalRoi} HPG</span>
        </div>
      </div>
    </div>
  );
}

export default LevelPlace;
