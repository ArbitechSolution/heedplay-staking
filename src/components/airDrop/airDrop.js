import React, { useEffect, useState } from "react";
import "./airDrop.css";
import { HashLink } from "react-router-hash-link";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import {
  airDropAddress,
  airDropAbi,
  airDropTokenAbi,
  airDropTokenAddress,
} from "../../utils/airDropContract";
import Countdown from "react-countdown";

const AirDrop = ({ props: props }) => {
  const account = props?.account;
  const [staked, setStaked] = useState("0.00");
  const [claimed, setClaimed] = useState("0.00");
  const [withdrawl, setWithdrawl] = useState("0.00");
  const [owner, setOwner] = useState(false);
  const [balance, setBalance] = useState(0);
  const [time, setTime] = useState(Date.now());
  const [newTime, setNewTime] = useState(false);
  const getTime = async () => {
    try {
      const web3 = window.web3;
      const contractOfStaking = new web3.eth.Contract(
        airDropAbi,
        airDropAddress
      );
      let userInfo = await contractOfStaking.methods.userInfo(account).call();
      let endTime = userInfo.unstakeTime;
      setTime(
        (parseInt(endTime) - Math.floor(new Date().getTime() / 1000.0)) * 1000
      );
      setNewTime(true);
    } catch (error) {
      console.error("error while get time", error);
    }
  };
  const Completionist = () => {
    return (
      <div className="countdown d-flex justify-content-center align-items-center">
        <div>
          <span className="text-white number days btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Days</span>
        </div>
        <div>
          <span className="text-white number hours btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Hours</span>
        </div>
        <div>
          <span className="text-white number minutes btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Minutes</span>
        </div>
        <div>
          <span className="text-white number seconds btn-inner-countdown ms-1 me-1">
            0
          </span>
          <span className="box_text text-light ms-1 me-1">Seconds</span>
        </div>
      </div>
    );
  };

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (newTime == false || completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
        <div className="countdown d-flex justify-content-center align-items-center">
          <div>
            <span className="text-white number days btn-inner-countdown ms-1 me-1">
              {days}
            </span>
            <span className="box_text text-light ms-1 me-1">Days</span>
          </div>
          <div>
            <span className="text-white number hours btn-inner-countdown ms-1 me-1">
              {hours}
            </span>
            <span className="box_text text-light ms-1 me-1">Hours</span>
          </div>
          <div>
            <span className="text-white number minutes btn-inner-countdown ms-1 me-1">
              {minutes}
            </span>
            <span className="box_text text-light ms-1 me-1">Minutes</span>
          </div>
          <div>
            <span className="text-white number seconds btn-inner-countdown ms-1 me-1">
              {seconds}
            </span>
            <span className="box_text text-light ms-1 me-1">Seconds</span>
          </div>
        </div>
      );
    }
  };
  const handleGetValues = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        const stakedAmount = await airDropContract.methods
          .userInfo(account)
          .call();
        let claimedReward = web3.utils.fromWei(stakedAmount?.claimedReward);
        claimedReward = parseFloat(claimedReward).toFixed(5);
        setClaimed(claimedReward);

        let staked = web3.utils.fromWei(stakedAmount?.stakedAmount);
        staked = parseFloat(staked).toFixed(2);
        setStaked(staked);

        let withdrawl = web3.utils.fromWei(stakedAmount?.withdrawlAmount);
        withdrawl = parseFloat(withdrawl).toFixed(2);
        setWithdrawl(withdrawl);
      }
    } catch (err) {
      console.log("error while getting values");
    }
  };
  const handleWithdrawReward = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        let claimAmount = await airDropContract.methods
          .calculateReward(account)
          .call();
        claimAmount = web3.utils.fromWei(claimAmount);
        if (parseFloat(claimAmount) > 50) {
          await airDropContract.methods.claimReward(account).send({
            from: account,
          });
          toast.success("Transaction Successful");
          handleGetValues();
          getBalance();
        } else {
          toast.info("You don't have any Reward yet!");
        }
      }
    } catch (err) {
      console.log("error while claiming Reward");
    }
  };
  const handleUnstake = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Wrong Network");
      } else if (account == "Connect") {
        toast.info("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropAbi,
          airDropAddress
        );
        if (newTime) {
          toast.info("Unstake time not reached");
        } else {
          if (staked > 0) {
            await airDropContract.methods.unstake().send({ from: account });
            toast.success("Transaction Successful");
            handleGetValues();
            getBalance();
          } else {
            toast.info("You dont have any staked amount");
          }
        }
      }
    } catch (err) {
      console.log("error while claiming Reward");
    }
  };
  const getBalance = async () => {
    try {
      if (account == "No Wallet") {
        console.log("Not Connected");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect") {
        console.log("Not Connected");
      } else {
        const web3 = window.web3;
        const airDropContract = new web3.eth.Contract(
          airDropTokenAbi,
          airDropTokenAddress
        );
        let bal = await airDropContract.methods.balanceOf(account).call();
        bal = web3.utils.fromWei(bal);
        bal = parseFloat(bal).toFixed(5);
        setBalance(bal);
      }
    } catch (err) {
      console.log("error while getting balance");
    }
  };
  useEffect(() => {
    handleGetValues();
    getBalance();
    getTime();
  }, [account]);

  return (
    <div className="container-fluid bg-dark airDrop-contianer d-flex justify-content-center align-items-center flex-column">
      <div className="row">
        <div className="col-12">
          <h1 className="text-light">Air Drop Staking</h1>
        </div>
      </div>
      <div className="row d-flex flex-column  g-0">
        <div className="col mt-2 g-0">
          <span className="text-staked text-white">
            Staked for 365 Days and Reward is 0.1 % per day
          </span>
        </div>
      </div>
      <div className="col-md-10">
        <div className="button-left">
          <HashLink className="arrow-color btn-arrow p-2" to="/">
            <IoMdArrowBack />
          </HashLink>
        </div>
      </div>
      <Countdown date={Date.now() + time} renderer={renderer} />
      <div className="row boxStakedDetail1 d-flex justify-content-center my-5">
        <div className="col-12 align-items-center mt-5">
          <div className="row d-flex justify-content-around ">
            <div className="col-sm-12 col-md-3  d-flex flex-column">
              <span className="text-pool">
                <b>Total Staked</b>
              </span>
              <span className="text-pool text-white">{staked}</span>
            </div>
            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b>Total WithDraw</b>
              </span>
              <span className="text-pool text-white">{claimed}</span>
            </div>
            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b>Total Reward</b>
              </span>
              <span className="text-pool text-white">{withdrawl}</span>
            </div>
            <div className="col-sm-12 col-md-3 d-flex flex-column">
              <span className="text-pool">
                <b>Account Balance</b>
              </span>
              <span className="text-pool text-white">{balance}</span>
            </div>
          </div>
        </div>
        <div className="col-12 align-items-center mt-5">
          <div className="row d-flex justify-content-around mt-5">
            <div className=" col-4 ">
              <button
                className=" btn-inner-air1"
                onClick={() => {
                  handleWithdrawReward();
                }}
              >
                Withdraw
              </button>
            </div>
            <div className=" col-4 ">
              <button
                className=" btn-inner-air1"
                onClick={() => {
                  handleUnstake();
                }}
              >
                Unstake
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AirDrop;
