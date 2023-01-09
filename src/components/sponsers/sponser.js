import React from "react";
import "./sponser.css";
import sponser from "../../Assets/images/footer.ca581494.png";
import pancake from "../../Assets/images/PenCake_logo.png";
import Coinbase_logo from "../../Assets/images/Coinbase_logo.png";
import horizontal_white from "../../Assets/images/horizontal_white.png";
const Sponser = () => {
  return (
<div className="bg-dark sponser-container">
    <div className="container  pt-5 pb-5 d-flex flex-column ">
      <h3 className=" text-center  text-sponsors mb-4">SPONSORS</h3>
      <div className="row">
        <div className="col-12">
          <img className="img-fluid" src={sponser} alt="sponsers"></img>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-2">
        <div className="col-12 d-flex justify-content-center">
          <img
            className="img-fluid imgSponser "
            src={pancake}
            alt="sponsers"
          ></img>
          <img
            className="img-fluid imgSponser2 mt-4"
            src={Coinbase_logo}
            alt="sponsers"
          ></img>
          <img
            className="img-fluid imgSponser"
            src={horizontal_white}
            alt="sponsers"
          ></img>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Sponser;
