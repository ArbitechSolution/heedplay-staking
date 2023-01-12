import React from "react";
import "./stakedDetails.css";
const StakedDetails = () => {
  return (
    <div className="container-fluid bg-dark stakedDetail-container">
      <div className="row boxStakedDetail">
        <div className="col-lg-12 ">
          <p className=" text-captilize stakedDetail-heading mt-3">
            Total income: based on your tarrif plan (
            <b className="boldText">from 0.16% to 0.33% daily</b>)
          </p>
          <p className="  stakedDetail-heading mt-3">
            Basic interest rate:
            <span className="boldText">+0.5% every 24 hours</span> - only for
            new deposits
          </p>
          <p className=" text-captilize stakedDetail-heading mt-3">
            Minimal deposit: <span className="boldText">100 HPG</span>, no
            maximal limit
          </p>
          <p className=" text-captilize stakedDetail-heading mt-3">
            Earnings <span className="boldText">every moment</span> , withdraw
            <span className="boldText">any time</span> (if you use
            capitalization of interest you can withdraw only after end of your
            deposit)
          </p>
        </div>
      </div>
    </div>
  );
};
export default StakedDetails;
