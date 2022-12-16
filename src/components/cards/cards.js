import React, { useState, useEffect, useContext } from "react";
import "./cards.css";
import Tlogo from "../../Assets/images/Tlogo-01.png";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { CgArrowsExchange } from "react-icons/cg";
import Tlogosmall from "../../Assets/images/Tlogosmall-01.png";
import TlogosmallSilver from "../../Assets/images/coinxd-01.png";
import { loadWeb3 } from "../../Api/connectivity";
import { toast } from "react-toastify";
import {
  stakingAbi,
  stkaingAddress,
  tokenAddress,
  tokenAbi,
} from "../../utils/staking";

const Cards = ({ props: props }) => {
  const [amountPlan1, setAmountPlan1] = useState(0);
  const [amountPlan2, setAmountPlan2] = useState(0);
  const [amountPlan3, setAmountPlan3] = useState(0);
  const [amountPlan4, setAmountPlan4] = useState(0);
  const [stakedValue1, setStakedValue1] = useState(0);
  const [stakedValue2, setStakedValue2] = useState(0);
  const [stakedValue3, setStakedValue3] = useState(0);
  const [stakedValue4, setStakedValue4] = useState(0);
  const [earnedValue1, setEarnedValue1] = useState(0);
  const [earnedValue2, setEarnedValue2] = useState(0);
  const [earnedValue3, setEarnedValue3] = useState(0);
  const [earnedValue4, setEarnedValue4] = useState(0);

  const handleConnect = async () => {
    let acc = await loadWeb3();
    props?.setAccount(acc);
  };
  const account = props.account;
  const handleAmountplan = (e, plan) => {
    plan(e.target.value);
  };
  const handleClaim = async (time, amountToClaim) => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        if (amountToClaim > 0) {
          const web3 = window.web3;
          const stakingContract = new web3.eth.Contract(
            stakingAbi,
            stkaingAddress
          );
          await stakingContract.methods.withdraw(time).send({ from: account });
          handleReward();
          toast.success("Transaction Successful");
        } else {
          toast.info("You don't have any Reward yet!");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleStake = async (amountForplan, time) => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        if (amountForplan > 0) {
          const web3 = window.web3;
          const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
          let tokenBalance = await tokenContract.methods
            .balanceOf(account)
            .call();

          let amountPlan = web3.utils.toWei(amountForplan);
          if (parseFloat(amountPlan) <= parseFloat(tokenBalance)) {
            const stakingContract = new web3.eth.Contract(
              stakingAbi,
              stkaingAddress
            );
            await tokenContract.methods
              .approve(account, amountPlan)
              .send({ from: account });
            // let days = plandays * 86400;
            await stakingContract.methods
              .deposit(amountPlan, time)
              .send({ from: account });
            handleTotalStake();
            toast.success("Transaction Successful");
          } else {
            toast.info("Oops! your blance is low");
          }
        } else {
          toast.info("Please enter value greater than zero");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUnstake = async (amountToUnstake, timeToUnstake) => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        if (amountToUnstake > 0) {
          const web3 = window.web3;
          const stakingContract = new web3.eth.Contract(
            stakingAbi,
            stkaingAddress
          );
          await stakingContract.methods
            .unstake(timeToUnstake)
            .send({ from: account });
          handleTotalStake();
          toast.success("Transaction Successful");
        } else {
          toast.info("Please staked first!");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleTotalStake = async () => {
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
        let staked = await stakingContract.methods.userInfo(account).call();
        console.log("staked", staked);

        setStakedValue1(
          parseFloat(web3.utils.fromWei(staked.totalStake_100)).toFixed(2)
        );
        setStakedValue2(
          parseFloat(web3.utils.fromWei(staked.totalStake_200)).toFixed(2)
        );
        setStakedValue3(
          parseFloat(web3.utils.fromWei(staked.totalStake_400)).toFixed(2)
        );
        setStakedValue4(
          parseFloat(web3.utils.fromWei(staked.totalStake_600)).toFixed(2)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleReward = async () => {
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
        let earned = await stakingContract.methods.getRewards(account).call();
        console.log("reward", earned);

        setEarnedValue1(
          parseFloat(web3.utils.fromWei(earned._reward_100)).toFixed(2)
        );
        setEarnedValue2(
          parseFloat(web3.utils.fromWei(earned._reward_200)).toFixed(2)
        );
        setEarnedValue3(
          parseFloat(web3.utils.fromWei(earned._reward_400)).toFixed(2)
        );
        setEarnedValue4(
          parseFloat(web3.utils.fromWei(earned._reward_600)).toFixed(2)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleTotalStake();
    handleReward();
  }, [account]);
  return (
    <div className="container-fluid w-100  bg-dark cards-container pt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-4 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">st pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">st staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">538,999.032</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">≈ $ 18.06</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-4 d-flex flex-row">
                      <span className="text-pool me-1"> 100 Days</span>
                      {/* <span className="text-pool me-1"> APY 4.305e-8%</span> */}
                      {/* <span>
                        <CgArrowsExchange style={{ color: "#ced3d9" }} />
                      </span> */}
                    </div>
                    <div className="col-8">
                      {/* <a href="#" alt="" className="text-pool">
                        View Contract
                        <HiArrowTopRightOnSquare />
                      </a> */}
                      <span className="text-pool me-1">
                        Reward 0.25 % per day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Available</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <input
                          type="number"
                          className="value-afterPool input-field"
                          value={amountPlan1}
                          onChange={(e) => {
                            handleAmountplan(e, setAmountPlan1);
                          }}
                        ></input>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => handleStake(amountPlan1, 300)}
                    >
                      Stake ST
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Staked</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{stakedValue1}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue1, 300);
                      }}
                    >
                      Unstake
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">SR Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img
                          src={TlogosmallSilver}
                          alt=""
                          className="img-small"
                        />
                        <span className="value-afterPool">{earnedValue1}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleClaim(300, earnedValue1);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-12 d-flex">
                    <span className="sr-para">
                      SR can be claimed after SR launched on DEX.
                    </span>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Early quit tax</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">st pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">st staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">538,999.032</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">≈ $ 18.06</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-4 d-flex flex-row">
                      <span className="text-pool me-1"> 200 Days</span>
                    </div>
                    <div className="col-8">
                      <span className="text-pool me-1">
                        Reward 0.35 % per day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Available</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <input
                          type="number"
                          className="value-afterPool input-field"
                          value={amountPlan2}
                          onChange={(e) => {
                            handleAmountplan(e, setAmountPlan2);
                          }}
                        ></input>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => handleStake(amountPlan2, 600)}
                    >
                      Stake ST
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Staked</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{stakedValue2}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue2, 600);
                      }}
                    >
                      Unstake
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">SR Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img
                          src={TlogosmallSilver}
                          alt=""
                          className="img-small"
                        />
                        <span className="value-afterPool">{earnedValue2}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleClaim(600, earnedValue2);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-12 d-flex">
                    <span className="sr-para">
                      SR can be claimed after SR launched on DEX.
                    </span>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Early quit tax</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">st pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">st staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">538,999.032</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">≈ $ 18.06</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-4 d-flex flex-row">
                      <span className="text-pool me-1"> 400 Days</span>
                    </div>
                    <div className="col-8">
                      <span className="text-pool me-1">
                        Reward 0.45 % per day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Available</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <input
                          type="number"
                          className="value-afterPool input-field"
                          value={amountPlan3}
                          onChange={(e) => {
                            handleAmountplan(e, setAmountPlan3);
                          }}
                        ></input>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => handleStake(amountPlan3, 900)}
                    >
                      Stake ST
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Staked</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{stakedValue3}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue3, 900);
                      }}
                    >
                      Unstake
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">SR Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img
                          src={TlogosmallSilver}
                          alt=""
                          className="img-small"
                        />
                        <span className="value-afterPool">{earnedValue3}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleClaim(900, earnedValue3);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-12 d-flex">
                    <span className="sr-para">
                      SR can be claimed after SR launched on DEX.
                    </span>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Early quit tax</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">st pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">st staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">538,999.032</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">≈ $ 18.06</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-4 d-flex flex-row">
                      <span className="text-pool me-1"> 600 Days</span>
                    </div>
                    <div className="col-8">
                      <span className="text-pool me-1">
                        Reward 0.55 % per day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Available</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <input
                          type="number"
                          className="value-afterPool input-field"
                          value={amountPlan4}
                          onChange={(e) => {
                            handleAmountplan(e, setAmountPlan4);
                          }}
                        ></input>{" "}
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => handleStake(amountPlan4, 1200)}
                    >
                      Stake ST
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Staked</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{stakedValue4}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue4, 1200);
                      }}
                    >
                      Unstake
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">SR Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img
                          src={TlogosmallSilver}
                          alt=""
                          className="img-small"
                        />
                        <span className="value-afterPool">{earnedValue4}</span>
                      </div>
                      <div className="col mt-2">
                        <span className="doller-staked inner-doller">
                          $ 0.00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleClaim(1200, earnedValue4);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-12 d-flex">
                    <span className="sr-para">
                      SR can be claimed after SR launched on DEX.
                    </span>
                  </div>
                </div>
                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Early quit tax</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
