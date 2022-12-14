import React, { useState, useEffect } from "react";
import "./cards.css";
import Tlogo from "../../Assets/images/Tlogo-01.png";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { CgArrowsExchange } from "react-icons/cg";

const Cards = () => {
  return (
    <div className="container-fluid w-100  bg-dark cards-container">
      <div className="row">
        <div className="col">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">st pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">st staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">538,999.032</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">≈ $ 18.06</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-6 d-flex flex-row">
                      <span className="text-pool"> APY 4.305e-8%</span>
                      <span>
                        <CgArrowsExchange />
                      </span>
                    </div>
                    <div className="col-6">
                      <a href="#" alt="" className="text-pool">
                        View Contract
                        <BsArrowUpRightSquareFill />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
