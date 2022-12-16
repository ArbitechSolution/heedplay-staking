import React from "react";
import logoGolden from "../../Assets/images/LogoGolden-01.png";
import "./footer.css";
const Footer = () => {
  return (
    <div className="container-fluid w-100 footer-container ">
      <div className="row ">
        <div className="col-md-3 col-sm-12 mt-5 d-flex justify-content-center align-items-center">
          <img src={logoGolden} alt="" className="footer-img"></img>
        </div>
        <div className="col-md-3 col-sm-12 mt-5">
          <div className="row ">
            <div className="col-12 footer-col">
              <span className="footer-text-headeing">About</span>
            </div>
            <div className="col-12 footer-col">
              <span className="footer-text">White Paper</span>
              <span className="footer-text">Project Overview</span>
              <span className="footer-text">Faq</span>
              <span className="footer-text">Tokenomics</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 mt-5 ">
          <div className="row">
            <div className="col-12 footer-col ">
              <span className="footer-text-headeing">Social</span>
            </div>
            <div className="col-12 footer-col ">
              <span className="footer-text">Telegram</span>
              <span className="footer-text">Twitter</span>
              <span className="footer-text">Discord</span>
              <span className="footer-text">Medium</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 mt-5 ">
          <div className="row">
            <div className="col-12 footer-col ">
              <span className="footer-text-headeing">others</span>
            </div>
            <div className="col-12 footer-col ">
              <span className="footer-text ">Sacred Realm</span>
              <span className="footer-text">Help Center</span>
              <span className="footer-text">ST $ 0</span>
              <span className="footer-text">SR $ 0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
