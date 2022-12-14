import React from "react";
import Cards from "../components/cards/cards";
import Staked from "../components/staked/staked";
import Staking from "../components/staking/staking";
const StakingPage = () => {
  return (
    <div className="">
      <Staking />
      <Staked />
      <Cards />
    </div>
  );
};
export default StakingPage;
