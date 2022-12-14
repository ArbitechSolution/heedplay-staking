import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logoGolden from "../../Assets/images/LogoGolden-01.png";
import { HashLink } from "react-router-hash-link";
import "./navbar.css";
const CustomNavbar = () => {
  const [iscolor, setIsColor] = useState("Create Accounts");
  const { pathname } = useLocation();

  const changePath = () => {
    if (pathname) {
      if (pathname == "/staking") {
        setIsColor("staking");
      } else if (pathname == "/bond") {
        setIsColor("bond");
      } else if (pathname == "/nft") {
        setIsColor("nft");
      } else if (pathname == "/market") {
        setIsColor("market");
      } else if (pathname == "/game") {
        setIsColor("game");
      } else if (pathname == "/user") {
        setIsColor("user");
      }
    }
  };
  useEffect(() => {
    changePath();
  });
  return (
    <div className="container-fluid w-100  bg-dark ">
      <div className="row d-flex justify-content-center">
        <div className="col-11">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <HashLink className="navbar-brand " to="/">
                  <img className="nav-logo" src={logoGolden} alt="logo" />
                </HashLink>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item font18">
                    <HashLink
                      className={`nav-link ${
                        iscolor == "bond" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/bond"
                    >
                      Bond
                    </HashLink>
                  </li>
                  <li className="nav-item font18">
                    <HashLink
                      className={`nav-link ${
                        iscolor == "staking" ? "active" : ""
                      }`}
                      to="/staking"
                    >
                      Staking
                    </HashLink>
                  </li>
                  <li className="nav-item font18">
                    <HashLink
                      className={`nav-link ${iscolor == "nft" ? "active" : ""}`}
                      to="/nft"
                    >
                      NFT
                    </HashLink>
                  </li>
                  <li className="nav-item font18">
                    <HashLink
                      className={`nav-link ${
                        iscolor == "market" ? "active" : ""
                      }`}
                      to="/market"
                    >
                      Market
                    </HashLink>
                  </li>
                  <li className="nav-item font18">
                    <HashLink
                      className={`nav-link ${
                        iscolor == "game" ? "active" : ""
                      }`}
                      to="/game"
                    >
                      Game
                    </HashLink>
                  </li>
                  <li className="nav-item font18">
                    <HashLink
                      className={`nav-link ${
                        iscolor == "user" ? "active" : ""
                      }`}
                      to="/user"
                    >
                      User Center
                    </HashLink>
                  </li>
                </ul>
                <button className="btn-connect">Connect</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default CustomNavbar;
