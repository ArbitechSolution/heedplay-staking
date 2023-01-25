import React from "react";
import logoGolden from "../../Assets/images/LogoGolden-01.png";
import Whitepaperone from "../documment/HEEDPLAYWHITEPAPER.pdf";
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
              <a href={Whitepaperone} target="_blank" className="footer-text">
                <span>White Paper</span>
              </a>
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
              <a
                href="https://t.me/Heed2play"
                target="_blank"
                rel="noreferrer"
                className="telegram footer-text"
              >
                Telegram
              </a>
              <a
                href="https://twitter.com/Heed2play"
                target="_blank"
                rel="noreferrer"
                className="twitter footer-text"
              >
                Twitter
              </a>
              <a
                href="https://discord.gg/xYexCvXy"
                target="_blank"
                rel="noreferrer"
                className="discord footer-text"
              >
                Discord
              </a>
              <a
                href="https://medium.com/@heed2play"
                target="_blank"
                rel="noreferrer"
                className="discord pe-1 footer-text"
              >
                Medium
              </a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
