import React from "react";
import CommingSoon from "../components/cards/coming-soon/coming-soon";
import Footer from "../components/footer/footer";

const CommingPage = () => {
  return (
    <div className="contianer commingPage d-flex justify-content-between align-items-center flex-column">
      <CommingSoon />
      <Footer />
    </div>
  );
};
export default CommingPage;
