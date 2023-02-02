import React from "react";
import DiamondUserComponent from "../components/diamondUser/diamonduser";
import Footer from "../components/footer/footer";

function diamonduser(props) {
  return (
    <>
      <DiamondUserComponent props={props} />
      <Footer />
    </>
  );
}

export default diamonduser;
