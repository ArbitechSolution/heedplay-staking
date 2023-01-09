import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";


function Level(props) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6  mb-5">
              <h3 className="text-level">level</h3>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn-arrow"
                  onClick={() => {
                    props?.decrement();
                  }}
                >
                  <FiArrowLeft />
                </button>
                <span className="level-input">{props?.levelNumber}</span>
                <button
                  className="btn-arrow"
                  onClick={() => {
                    props?.increment();
                  }}
                >
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Level;
