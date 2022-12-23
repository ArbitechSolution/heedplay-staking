import React from "react";
import Footer from "../components/footer/footer";
import AirDropComponent from "../components/airDrop/airDrop";
const AirDrop = (props) => {
  return (
    <div className="">
      <AirDropComponent props={props} />
      <Footer />
    </div>
  );
};
export default AirDrop;
