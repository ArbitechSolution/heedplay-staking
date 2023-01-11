import React, { useEffect, useState } from "react";
import Footer from "../components/footer/footer";
import LevelDetail from "../components/level-detail/levelDetail";
import LevelCard from "../components/level-detail/LevelCard";
import { stakingAbi, stkaingAddress } from "../utils/staking";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { HashLink } from "react-router-hash-link";

import { IoMdArrowBack} from "react-icons/io";

function LevelPage(props) {
  const account = props?.account;
  const [levelNumber, setLevelNumber] = useState(1);
  const [levelAddressDetail, setlevelAddressDetails] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [totalRoi, setTotalRoi] = useState(0);
  const increment = () => {
    if (levelNumber < 10) setLevelNumber(levelNumber + 1);
  };
  const decrement = () => {
    if (levelNumber > 1) setLevelNumber(levelNumber - 1);
  };

  const handleRoiAndTotalUser = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        const users = await stakingContract.methods
          .userCount(account, levelNumber)
          .call();
        setUserCount(users);

        let roi = await stakingContract.methods
          .UpdateROIInfo(account, levelNumber)
          .call();
        roi = web3.utils.fromWei(roi);
        roi = parseFloat(roi).toFixed(3);
        setTotalRoi(roi);
        await usersDetails(users);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const usersDetails = async (usersCounted) => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );

        let newArray = [];
        let depo;
        let res;
        let totalDepo;
        let reward;
        if (usersCounted > 1) {
          for (let i = 1; i <= usersCounted; i++) {
            res = await stakingContract.methods
              .userReferral(account, levelNumber, i)
              .call();

            depo = await stakingContract.methods.totalDeposite(res).call();
            depo = web3.utils.fromWei(depo);

            totalDepo = await stakingContract.methods.userInfo(res).call();
            totalDepo = web3.utils.fromWei(totalDepo.totalDepositAmount);

            reward = await stakingContract.methods.rewardInfo(res).call();
            reward = web3.utils.fromWei(reward.total_Rewards);
            ////populate array
            newArray.push({
              address: res,
              currentDeposit: depo,
              totalDeposit: totalDepo,
              reward: reward,
            });
          }
        } else if (usersCounted == 1) {
          res = await stakingContract.methods
            .userReferral(account, levelNumber, 1)
            .call();
          depo = await stakingContract.methods.totalDeposite(res).call();
          depo = web3.utils.fromWei(depo);

          totalDepo = await stakingContract.methods.userInfo(res).call();
          totalDepo = web3.utils.fromWei(totalDepo.totalDepositAmount);

          reward = await stakingContract.methods.rewardInfo(res).call();
          reward = web3.utils.fromWei(reward.total_Rewards);
          ////populate array
          newArray.push({
            address: res,
            currentDeposit: depo,
            totalDeposit: totalDepo,
            reward: reward,
          });
        } else {
          newArray.push();
        }
        setlevelAddressDetails([...newArray]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    handleRoiAndTotalUser();
    // usersDetails();
    // }, 1000);
  }, [account, levelNumber]);
  return (
    <div >
      <div>
        <LevelDetail />
      </div>
      <div style={{ background: "linear-gradient(311deg, #121212, #0c0c0c)" }}>
      <div className="container" >
        {/* <Level
          levelNumber={levelNumber}
          decrement={decrement}
          increment={increment}
        /> */}
        <div className="row level-overflow">
          <div className="col-md-12 mt-5 ">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12  mb-5">
                <h3 className="text-level">level</h3>
                <div className="button-left">
                  <HashLink className="arrow-color btn-arrow p-3" to="/">
                  <IoMdArrowBack />
                  </HashLink>
                </div>
                <div className="d-flex justify-content-center gap-2">
               
                  <button
                    className="btn-arrow"
                    onClick={() => {
                      decrement();
                    }}
                  >
                    <FiArrowLeft />
                  </button>
                  <span className="level-input">{levelNumber}</span>
                  <button
                    className="btn-arrow"
                    onClick={() => {
                      increment();
                    }}
                  >
                    <FiArrowRight />
                  </button>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <LevelPlace userCount={userCount} totalRoi={totalRoi} /> */}
        <div className="container staked-container ">
          <div className="row d-flex justify-content-center boxLevel mb-5">

            <div className="col-sm-12 col-lg-6 staked-column">
              <span className="d-flex text-captilize staked-heading sub">
                Total User
              </span>
              <span className="d-flex  staked-subheading">{userCount}</span>
            </div>

            <div className="col-sm-12 col-lg-6 staked-column">
              <span className="d-flex text-captilize staked-heading sub">
                Your Affiliate Reward
              </span>
              <span className="d-flex  staked-subheading">{totalRoi} HPG</span>
            </div>
          </div>
        </div>
        <div className="row level-overflow mt-5 mb-5">
          <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-block">
            <LevelCard
              itemsPerPage={10}
              levelAddressDetail={levelAddressDetail}
              title={"Level Detail"}
            />
          </div>
          <div className="col-12 col-lg-12 col-sm-12 d-none d-xl-none d-lg-block">
            <LevelCard
              itemsPerPage={10}
              levelAddressDetail={levelAddressDetail}
              title={"Level Detail"}
            />
          </div>
          <div className="col-12 col-lg-12 col-sm-12 d-block d-lg-none d-xl-none">
            <LevelCard
              itemsPerPage={5}
              levelAddressDetail={levelAddressDetail}
              title={"Level Detail"}
            />
          </div>
        </div>
       
        <Footer />
      </div>
    </div>
    </div>
  );
}

export default LevelPage;
