import React from "react";
import Cards from "../components/cards/cards";
import Footer from "../components/footer/footer";
import Sponser from "../components/sponsers/sponser";
import Staked from "../components/staked/staked";
import StakedDetails from "../components/stakedDetails/stakedDetails";
import Staking from "../components/staking/staking";
const StakingPage = (props) => {
  return (
    <div className="">
      <Staking />
      <Staked props={props} />
      <Cards props={props} />
      <StakedDetails />
      <Sponser />
      <Footer />
    </div>
  );
};
export default StakingPage;
