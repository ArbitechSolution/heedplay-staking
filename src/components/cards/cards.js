import React, { useState, useEffect, useContext } from "react";
import "./cards.css";
import { toast } from "react-toastify";
import {
  stakingAbi,
  stkaingAddress,
  tokenAddress,
  tokenAbi,
} from "../../utils/staking";
import Tlogo from "../../Assets/images/Tlogo-01.png";
import Tlogosmall from "../../Assets/images/Tlogosmall-01.png";
import Web3 from "web3";
// const web3Supply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const web3Supply = new Web3("https://bsc-dataseed1.binance.org");

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
  const [unStakedValue1, setUnStakedValue1] = useState(0);
  const [unStakedValue2, setUnStakedValue2] = useState(0);
  const [unStakedValue3, setUnStakedValue3] = useState(0);
  const [unStakedValue4, setUnStakedValue4] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [referralAddress, setReferralAddress] = useState("0");

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
        if (amountToClaim >= 100) {
          const web3 = window.web3;
          const stakingContract = new web3.eth.Contract(
            stakingAbi,
            stkaingAddress
          );
          await stakingContract.methods.withdraw(time).send({ from: account });
          await handleReward();
          await handleTotalEarned();
          await handleBalance();
          toast.success("Transaction Successful");
        } else {
          toast.info("You don't have enough Reward to claim!");
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
        if (amountForplan >= 100) {
          const web3 = window.web3;
          const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
          let tokenBalance = await tokenContract.methods
            .balanceOf(account)
            .call();
          props?.setBalance(
            parseFloat(web3.utils.fromWei(tokenBalance)).toFixed(3)
          );
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
          toast.info("Minimum HPG to stake is 100");
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
        if (amountToUnstake >= 100) {
          const web3 = window.web3;
          const stakingContract = new web3.eth.Contract(
            stakingAbi,
            stkaingAddress
          );

          let isUnstake = await stakingContract.methods
            .unstakeAmount(timeToUnstake, account)
            .call();
          isUnstake = isUnstake[0];
          if (isUnstake) {
            await stakingContract.methods
              .unstake(timeToUnstake)
              .send({ from: account });
            handleAllStake();
            handleTotalEarned();
            handleTotalStake();
            handleBalance();
            handleAllUnStake();
            toast.success("Transaction Successful");
          } else {
            toast.info("Unstake time isn't completed!");
          }
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
  const handleAllUnStake = async () => {
    try {
      if (account == "No Wallet") {
        // console.log("");
      } else if (account == "Wrong Network") {
        // console.log("");
      } else if (account == "Connect") {
        // console.log("");
      } else {
        const web3 = window.web3;
        const stakingContract = new web3.eth.Contract(
          stakingAbi,
          stkaingAddress
        );
        let unstake100 = await stakingContract.methods
          .unstakeAmount(99, account)
          .call();
        let unstake200 = await stakingContract.methods
          .unstakeAmount(195, account)
          .call();
        let unstake400 = await stakingContract.methods
          .unstakeAmount(390, account)
          .call();
        let unstake600 = await stakingContract.methods
          .unstakeAmount(585, account)
          .call();

        setUnStakedValue1(
          parseFloat(web3.utils.fromWei(unstake100[1])).toFixed(2)
        );
        setUnStakedValue2(
          parseFloat(web3.utils.fromWei(unstake200[1])).toFixed(2)
        );
        setUnStakedValue3(
          parseFloat(web3.utils.fromWei(unstake400[1])).toFixed(2)
        );
        setUnStakedValue4(
          parseFloat(web3.utils.fromWei(unstake600[1])).toFixed(2)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleReward = async () => {
    try {
      if (account == "No Wallet") {
        // console.log("Not Connected");
      } else if (account == "Wrong Network") {
        // console.log("Wrong Network");
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
          parseFloat(web3.utils.fromWei(earned._reward_100)).toFixed(4)
        );
        setEarnedValue2(
          parseFloat(web3.utils.fromWei(earned._reward_200)).toFixed(4)
        );
        setEarnedValue3(
          parseFloat(web3.utils.fromWei(earned._reward_400)).toFixed(4)
        );
        setEarnedValue4(
          parseFloat(web3.utils.fromWei(earned._reward_600)).toFixed(4)
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
        toast.success("Successfully Registered");
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
        let res = await stakingContract.methods.rewardReceived(account).call();
        let total = parseFloat(web3.utils.fromWei(res));
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
        props?.setdirects(parseFloat(web3.utils.fromWei(res.directs)));
        let total = parseFloat(web3.utils.fromWei(res.total_Rewards));
        total = total.toFixed(2);
        props?.setTotalEarned(total);
        let affiliate = await stakingContract.methods.UpdateROI(account).call();
        props?.setRoireleased(parseFloat(web3.utils.fromWei(affiliate)));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleReferralAddress = async () => {
    try {
      let URL = window.location.href;
      if (URL.includes("referrallink")) {
        let pathArray = URL.split("?");
        let UserID = pathArray[pathArray.length - 1];
        UserID = UserID.split("=");
        UserID = UserID[UserID.length - 1];
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
        props?.setBalance(
          parseFloat(web3.utils.fromWei(tokenBalance)).toFixed(3)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleContractBalance = async () => {
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
          .balanceOf(stkaingAddress)
          .call();
        props?.setContractBalance(
          parseFloat(web3.utils.fromWei(tokenBalance)).toFixed(3)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleTotalUsers = async () => {
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
        let totalUser = await stakingContract.methods.totalUser().call();
        setTotalUsers(totalUser);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleAllStake();
    handleAllUnStake();
    handleReward();
    handleTotalStake();
    handleTotalEarned();
    rewardInfo();
    handleReferralAddress();
    handleBalance();
    handleContractBalance();
    handleTotalUsers();
  }, [account]);
  useEffect(() => {
    setInterval(() => {
      handleReward();
      handleAllUnStake();
    }, 30000);
  }, [account]);
  return (
    <div className="container-fluid w-100  bg-dark cards-container pt-2">
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
      <div className="row d-flex justify-content-center mt-4">
        {/* <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center mt-2">
          <span className="card-title text-">Contract Balance</span>
          <span className="value-staked ms-5">{props?.contractBalance}</span>
        </div> */}
        <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center mt-2">
          <span className="card-title text-">User Balance</span>
          <span className="value-staked ms-5">{props?.balance}</span>
        </div>
        {/* <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center mt-2">
          <span className="card-title text-">Total Users</span>
          <span className="value-staked ms-5">{totalUsers}</span>
        </div> */}
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
                          <span className="value-staked">99 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.16 % per day
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
                        handleStake(amountPlan1, 99, setAmountPlan1)
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
                      <div className="col mt-2 d-flex flex-column">
                        <span className="text-staked">Unstakeable</span>
                        <span className="value-afterStaked">
                          {unStakedValue1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue1, 99);
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
                        handleClaim(99, earnedValue1);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>

                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimum deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">100 HPG</span>
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
                          <span className="value-staked">195 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.23 % per day
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
                        handleStake(amountPlan2, 195, setAmountPlan2)
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
                      <div className="col mt-2 d-flex flex-column">
                        <span className="text-staked">Unstakeable</span>
                        <span className="value-afterStaked">
                          {unStakedValue2}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue2, 195);
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
                        handleClaim(195, earnedValue2);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>

                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimum deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">100 HPG</span>
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
                          <span className="value-staked">390 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.26 % per day
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
                        handleStake(amountPlan3, 390, setAmountPlan3)
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
                      <div className="col mt-2 d-flex flex-column">
                        <span className="text-staked">Unstakeable</span>
                        <span className="value-afterStaked">
                          {unStakedValue3}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue3, 390);
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
                        handleClaim(390, earnedValue3);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>

                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimum deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">100 HPG</span>
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
                          <span className="value-staked">585 Days</span>
                        </div>
                        <div className="col mt-2">
                          <span className="doller-staked">
                            Reward 0.33 % per day
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
                        handleStake(amountPlan4, 585, setAmountPlan4)
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
                      <div className="col mt-2 d-flex flex-column">
                        <span className="text-staked">Unstakeable</span>
                        <span className="value-afterStaked">
                          {unStakedValue4}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <button
                      className=" btn-inner"
                      onClick={() => {
                        handleUnstake(stakedValue4, 585);
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
                        handleClaim(585, earnedValue4);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>

                <div className="row d-flex mt-3">
                  <div className="col-6 d-flex">
                    <span className="sr-para2">Minimum deposit</span>
                  </div>
                  <div className="col-6 d-flex">
                    <span className="sr-para2">100 HPG</span>
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
