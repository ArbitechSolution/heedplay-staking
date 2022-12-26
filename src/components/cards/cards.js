import React, { useState, useEffect, useContext } from "react";
import "./cards.css";
import Tlogo from "../../Assets/images/Tlogo-01.png";
import Tlogosmall from "../../Assets/images/Tlogosmall-01.png";
import { loadWeb3 } from "../../Api/connectivity";
import { toast } from "react-toastify";
import {
  stakingAbi,
  stkaingAddress,
  tokenAddress,
  tokenAbi,
} from "../../utils/staking";
import Web3 from "web3";
const web3Supply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
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
  const [referralAddress, setReferralAddress] = useState("0");
  const [balance, setBalance] = useState("0.00");
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
          handleTotalEarned();
          toast.success("Transaction Successful");
        } else {
          toast.info("You don't have any Reward yet!");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleStake = async (amountForplan, time, settingInputState) => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        if (amountForplan >= 10) {
          const web3 = window.web3;
          const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
          let tokenBalance = await tokenContract.methods
            .balanceOf(account)
            .call();
          setBalance(parseFloat(web3.utils.fromWei(tokenBalance)).toFixed(3));
          let amountPlan = web3.utils.toWei(amountForplan);
          if (parseFloat(amountPlan) <= parseFloat(tokenBalance)) {
            const stakingContract = new web3.eth.Contract(
              stakingAbi,
              stkaingAddress
            );
            await tokenContract.methods
              .approve(stkaingAddress, amountPlan)
              .send({ from: account });
            // let days = plandays * 86400;
            await stakingContract.methods
              .deposit(amountPlan, time)
              .send({ from: account });
            handleAllStake();
            handleTotalStake();
            rewardInfo();
            handleReferralAddress();
            toast.success("Transaction Successful");
            settingInputState("0");
          } else {
            toast.info("Oops! your blance is low");
          }
        } else {
          toast.info("Please enter value greater or equal to ten");
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
          handleAllStake();
          handleTotalEarned();
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
  const handleAllStake = async () => {
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
        // console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        let earned = await stakingContract.methods.getRewards(account).call();
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
  const handleRegisterReferral = (e) => {
    setReferralAddress(e.target.value);
  };
  const handleRegister = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        await stakingContract.methods
          .register(referralAddress)
          .send({ from: account });
        toast.success("Successfuly Registered");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Registration Failed!");
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
        let total1 =
          parseFloat(web3.utils.fromWei(staked.totalStake_100)) +
          parseFloat(web3.utils.fromWei(staked.totalStake_200)) +
          parseFloat(web3.utils.fromWei(staked.totalStake_400)) +
          parseFloat(web3.utils.fromWei(staked.totalStake_600));
        total1 = total1.toFixed(2);
        props?.setTotalStaked(total1);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleTotalEarned = async () => {
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
        let res = await stakingContract.methods.rewardInfo(account).call();
        let total = parseFloat(web3.utils.fromWei(res?.total_Rewards));

        total = total.toFixed(2);
        props?.setTotalEarned(total);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const rewardInfo = async () => {
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

        let res = await stakingContract.methods.rewardInfo(account).call();
        props?.setRoireleased(parseFloat(web3.utils.fromWei(res.ROIReleased)));
        props?.setdirects(parseFloat(web3.utils.fromWei(res.directs)));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleReferralAddress = async () => {
    try {
      let URL = window.location.href;
      if (URL.includes("referrallink")) {
        // setcheckreffarl(true)
        let pathArray = URL.split("?");
        let UserID = pathArray[pathArray.length - 1];
        UserID = UserID.split("=");
        UserID = UserID[UserID.length - 1];
        // console.log("LAST", UserID);
        setReferralAddress(UserID);
      } else {
        const stakingContract = new web3Supply.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        const address = await stakingContract.methods.userInfo(account).call();
        let condition = address?.referrer.includes(
          "0x0000000000000000000000000000000000000000"
        );
        if (condition) {
          const defaultReferal = await stakingContract.methods
            .defaultRefer()
            .call();
          setReferralAddress(defaultReferal);
        } else {
          setReferralAddress(address?.referrer);
        }
      }
    } catch (e) {
      console.log("Error Whille Referral Fuction Call", e);
    }
  };
  const handleBalance = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
        let tokenBalance = await tokenContract.methods
          .balanceOf(account)
          .call();
        setBalance(parseFloat(web3.utils.fromWei(tokenBalance)).toFixed(3));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleAllStake();
    handleReward();
    handleTotalStake();
    handleTotalEarned();
    rewardInfo();
    handleReferralAddress();
    handleBalance();
  }, [account]);
  useEffect(() => {
    setInterval(() => {
      handleReward();
    }, 30000);
  }, [account]);
  // useEffect(() => {
  //   handleReferralAddress();
  // }, []);
  return (
    <div className="container-fluid w-100  bg-dark cards-container pt-5">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-12 d-flex justify-content-center">
          <span className="value-staked text-captilized ">
            Please use this referral address if you are not registered
          </span>
        </div>
      </div>
      <div className="row d-flex justify-content-space mt-4">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <input
            type="text"
            className=" input-field-2 me-5"
            value={referralAddress}
            onChange={(e) => {
              handleRegisterReferral(e);
            }}
          ></input>
          <button className=" btn-inner" onClick={() => handleRegister()}>
            Register
          </button>
        </div>
      </div>
      <div className="row d-flex justify-content-space mt-4">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <span className="card-title text-">Balance</span>
          <span className="value-staked ms-5">{balance}</span>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">HPG Pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">Staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">100 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.2 % per day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Amount</span>
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end mt-2">
                    <button
                      className=" btn-inner"
                      onClick={() =>
                        handleStake(amountPlan1, 300, setAmountPlan1)
                      }
                    >
                      Stake HPG
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                        <span className="text-staked">HPG Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{earnedValue1}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimal deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">10 HPG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">HPG Pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">Staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">200 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.35 % per day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Amount</span>
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end mt-2">
                    <button
                      className=" btn-inner"
                      onClick={() =>
                        handleStake(amountPlan2, 600, setAmountPlan2)
                      }
                    >
                      Stake HPG
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                        <span className="text-staked">HPG Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{earnedValue2}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimal deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">10 HPG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">HPG Pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">Staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">400 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.45 % per day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Amount</span>
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end mt-2">
                    <button
                      className=" btn-inner"
                      onClick={() =>
                        handleStake(amountPlan3, 900, setAmountPlan3)
                      }
                    >
                      Stake HPG
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                        <span className="text-staked">HPG Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{earnedValue3}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimal deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">10 HPG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">HPG Pool</h5>
              <div className="out_top_box">
                <div className="top_box">
                  <div className="row d-flex">
                    <div className="col-4">
                      <img className="imgTLogo" src={Tlogo} alt="" />
                    </div>
                    <div className="col-8">
                      <div className="row d-flex flex-column ">
                        <div className="col mt-2">
                          <span className="text-staked">Staked</span>
                        </div>
                        <div className="col mt-2">
                          <span className="value-staked">600 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.55 % per day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top_box">
                <div className="row d-flex">
                  <div className="col-6">
                    <div className="row d-flex flex-column ">
                      <div className="col mt-2">
                        <span className="text-staked">Amount</span>
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
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end mt-2">
                    <button
                      className="btn-inner"
                      onClick={() =>
                        handleStake(amountPlan4, 1200, setAmountPlan4)
                      }
                    >
                      Stake HPG
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
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                        <span className="text-staked">HPG Earned</span>
                      </div>
                      <div className="col mt-2 d-flex">
                        <img src={Tlogosmall} alt="" className="img-small" />
                        <span className="value-afterPool">{earnedValue4}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-end">
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
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimal deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">10 HPG</span>
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
