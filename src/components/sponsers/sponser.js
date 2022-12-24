import React from "react";
import "./sponser.css";
import sponser from "../../Assets/images/footer.ca581494.png";
const Sponser = () => {
  return (
    <div className="container-fluid bg-dark sponser-container pt-5 pb-5 d-flex flex-column ">
      <span className="value-staked mb-4">SPONSORS</span>
      <div className="row">
        <div className="col-12">
          <img src={sponser} alt="sponsers"></img>
        </div>
      </div>
    </div>
  );
};
export default Sponser;
